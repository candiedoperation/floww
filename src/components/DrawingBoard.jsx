/*
    Floww
    Copyright (C) 2022  Atheesh Thirumalairajan <howdy@atheesh.org>
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import React, { useEffect, useRef } from 'react';
import { fabric } from 'floww-whiteboard'
import { Box, Chip, Paper, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import getFlowwBrushObject from './../middleware/getFlowwBrushObject';
import getFlowwCursor from '../middleware/getFlowwCursor';

//Placing outside since object resets on avatar state change (re-render)...
let activeUsersRefs = {};
let activeUsersBrushes = {};

const DrawingBoard = (props) => {
    const socket = props.socketIO;
    const wbOverlayDisableRef = React.useRef();
    const whiteboardRef = React.createRef(null);
    const wbWrapperRef = React.useRef(null);
    const [wbParentWidth, setWbParentWidth] = React.useState(1);
    const [wbParentHeight, setWbParentHeight] = React.useState(1);
    const [activeUsers, setActiveUsers] = React.useState([]);

    useEffect(() => {
        let timedId = null;
        enforceWrapperAspects();

        window.addEventListener('resize', () => {
            wrapperTo1px();
            clearTimeout(timedId);

            timedId = setTimeout(() => {
                enforceWrapperAspects();
                console.log(`${window.innerWidth}x${window.innerHeight}`);
            }, 250);
        });

        props.socketIO.on('cbv-cachedActiveUsersList', (uList) => {
            setActiveUsers((activeUsers) => uList)
        });

        props.socketIO.on('cbv-newActiveUser', (user) => {
            setActiveUsers((activeUsers) => [...activeUsers, user])
        });

        props.socketIO.on('cbv-delActiveUser', (user) => {
            setActiveUsers((activeUsers) =>
                activeUsers.filter((activeUser) => (activeUser.uId != user.uId))
            );
        });
    }, []);

    const wrapperTo1px = () => {
        setWbParentWidth(1);
        setWbParentHeight(1);
    }

    const enforceWrapperAspects = (aspectRatio) => {
        if (!aspectRatio) aspectRatio = 16 / 9;
        let wrapperHeight = wbWrapperRef.current.clientHeight;
        let wrapperWidth = wbWrapperRef.current.clientWidth;

        let plausibleHeight = (1 / aspectRatio) * wrapperWidth;
        let plausibleWidth = aspectRatio * wrapperHeight;

        if (plausibleHeight <= wrapperHeight) {
            // Try constraining width
            setWbParentWidth(wrapperWidth);
            setWbParentHeight(plausibleHeight);
            updateCanvasAspect(wrapperWidth, plausibleHeight);
        } else if (plausibleWidth <= wrapperWidth) {
            // Resort to constraining height
            setWbParentWidth(plausibleWidth);
            setWbParentHeight(wrapperHeight);
            updateCanvasAspect(plausibleWidth, wrapperHeight);
        } else { console.error("Whiteboard Wrapper Constraint ERR!") }
    }

    const updateCanvasAspect = (newWidth, newHeight) => {
        /* For standardizing the Zoom Parameter among all inst
        -nces, We compare ratios with a 1920 x 1080 resolution*/
        let scalingFactor = newWidth / 1920;
        whiteboardRef.current.setZoom(scalingFactor);

        whiteboardRef.current.setDimensions({
            width: newWidth,
            height: newHeight
        })
    }

    const fabricRef = React.useCallback((element) => {
        if (!element) return whiteboardRef.current?.dispose();
        whiteboardRef.current = new fabric.Canvas(element);
        manageWhiteboard(whiteboardRef.current);
    }, []);

    const manageWhiteboard = (whiteboard) => {
        //Send Whiteboard Object to Parent for activating Panel Controls
        props.sendWhiteboardObject(whiteboard);
        whiteboard.freeDrawingCursor = getFlowwCursor();
        whiteboard.isDrawing = false;

        const whiteboardSelectionKeyEvent = (e) => {
            if (e.key == 'Delete') {
                window.removeEventListener('keydown', whiteboardSelectionKeyEvent, false);
                props.socketIO.emit('cbv-delWbObjects', {
                    roomName: props.roomName,
                    uName: props.uName,
                    uId: props.socketIO.id,
                    activeObjects: whiteboard.getActiveObjects()
                });

                whiteboard.getActiveObjects().forEach((object) => {
                    whiteboard.remove(object);
                })
            }
        }

        socket.on("cbv-volatileStates", (states) => {
            if (states.wbOverlayDisableRef) {
                (
                    states.wbOverlayDisableRef == true ?
                    wbOverlayDisableRef.current.style['display'] = 'block' :
                    wbOverlayDisableRef.current.style['display'] = 'none'
                );
            }
        });

        socket.on("cbv-nibPosition", (nibData) => {
            activeUsersRefs[nibData.uId].current.style.marginLeft
                = `${(((nibData.event.pointer.x) / nibData.scalingFactor) * whiteboard.getZoom())}px`;

            activeUsersRefs[nibData.uId].current.style.marginTop
                = `${(((nibData.event.pointer.y) / nibData.scalingFactor) * whiteboard.getZoom())}px`;

            if (nibData.isDrawing) {
                activeUsersBrushes[nibData.uId]
                    .onMouseMove(
                        {
                            x: ((nibData.event.pointer.x) / nibData.scalingFactor),
                            y: ((nibData.event.pointer.y) / nibData.scalingFactor)
                        }, nibData.event
                    );
            }
        })

        socket.on('cbv-nibPress', (nibData) => {
            wbOverlayDisableRef.current.style['display'] = 'block';
            activeUsersBrushes[nibData.uId] = getFlowwBrushObject(nibData.nibId, whiteboard, true);
            activeUsersBrushes[nibData.uId].color = nibData.nibColor;
            activeUsersBrushes[nibData.uId].width = nibData.nibWidth;

            activeUsersBrushes[nibData.uId]
                .onMouseDown(
                    {
                        x: ((nibData.event.pointer.x) / nibData.scalingFactor),
                        y: ((nibData.event.pointer.y) / nibData.scalingFactor)
                    }, nibData.event
                )
        });

        socket.on('cbv-nibLift', (nibData) => {
            wbOverlayDisableRef.current.style['display'] = 'none';
            activeUsersBrushes[nibData.uId]
                .onMouseUp(nibData.event);
        });

        socket.on('cbv-createSelection', (e) => {
            let selection = new fabric.ActiveSelection([], { canvas: whiteboard });
            selection.aCoords = {
                tl: { x: 100, y: 100 },
                tr: { x: 200, y: 100 },
                bl: { x: 100, y: 200 },
                br: { x: 200, y: 200 }
            }
            whiteboard.setActiveObject(selection);
        });

        whiteboard.on("mouse:down", (nibEvent) => {
            whiteboard.isDrawing = true;
            if (whiteboard.isDrawingMode) {
                props.socketIO.emit("cbv-nibPress", {
                    roomName: props.roomName,
                    uName: props.uName,
                    uId: props.socketIO.id,
                    event: nibEvent,
                    scalingFactor: whiteboard.getZoom(),
                    nibId: whiteboard.flowwBrushIdentifier,
                    nibColor: whiteboard.freeDrawingBrush.color,
                    nibWidth: whiteboard.freeDrawingBrush.width
                });
            }
        });

        whiteboard.on("mouse:up", (nibEvent) => {
            //Save Canvas
            whiteboard.isDrawing = false;
            if (whiteboard.isDrawingMode) {
                props.socketIO.emit("cbv-nibLift", {
                    roomName: props.roomName,
                    uName: props.uName,
                    uId: props.socketIO.id,
                    event: nibEvent
                });
            }
        });

        whiteboard.on("mouse:move", (nibEvent) => {
            if (whiteboard.isDrawingMode) {
                props.socketIO.emit("cbv-nibPosition", {
                    roomName: props.roomName,
                    uName: props.uName,
                    uId: props.socketIO.id,
                    event: nibEvent,
                    isDrawing: whiteboard.isDrawing,
                    scalingFactor: whiteboard.getZoom()
                });
            }
        });

        whiteboard.on("selection:created", (e) => {
            window.addEventListener('keydown', whiteboardSelectionKeyEvent);
            socket.emit('cbv-createSelection', {
                roomName: props.roomName,
                uName: props.uName,
                uId: props.socketIO.id,
                event: e.selected
            })

            console.log(e);
        });

        whiteboard.on("selection:cleared", () => {
            window.removeEventListener('keydown', whiteboardSelectionKeyEvent, false);
        });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box ref={wbWrapperRef} sx={{ width: "100%", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Paper sx={{ position: "relative", borderRadius: "10px", overflow: "hidden", width: `${wbParentWidth}px`, height: `${wbParentHeight}px` }} elevation={3}>
                    <Box>
                        {
                            activeUsers.map((user) => {
                                activeUsersRefs[user.uId] = React.createRef(null);
                                activeUsersBrushes[user.uId] = new fabric.PencilBrush();
                                return (
                                    <Chip
                                        avatar={<Avatar>{user.uName.toString().slice(0, 1)}</Avatar>}
                                        label={user.uName.toString()}
                                        ref={activeUsersRefs[user.uId]}
                                        variant="outlined"
                                        style={{
                                            position: 'absolute',
                                        }}
                                    />
                                )
                            })
                        }
                    </Box>

                    <canvas style={{ borderRadius: "10px" }} width="100px" height="100px" ref={fabricRef} />
                    <Box ref={wbOverlayDisableRef} sx={{ display: 'none', position: "absolute", top: '0px', left: '0px', width: '100%', height: '100%' }}></Box>
                </Paper>
            </Box >
        </Box >
    );
}

export default DrawingBoard;