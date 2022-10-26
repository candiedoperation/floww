import React, { useEffect, useRef } from 'react';
import { fabric } from 'floww-whiteboard'
import { Box, Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import getFlowwBrushObject from './../middleware/getFlowwBrushObject';

//Placing outside since object resets on avatar state change (re-render)...
let activeUsersRefs = {};
let activeUsersBrushes = {};

const DrawingBoard = (props) => {
    const socket = props.socketIO;
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
        whiteboard.isDrawing = false;

        const whiteboardSelectionKeyEvent = (e) => {
            if (e.key == 'Delete') {
                window.removeEventListener('keydown', whiteboardSelectionKeyEvent, false);
                whiteboard.getActiveObjects().forEach((object) => {
                    whiteboard.remove(object);
                })
            }
        }

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
            console.log(nibData);
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
            activeUsersBrushes[nibData.uId]
                .onMouseUp(nibData.event);
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

        whiteboard.on("selection:created", () => {
            window.addEventListener('keydown', whiteboardSelectionKeyEvent);
        });

        whiteboard.on("selection:cleared", () => {
            window.removeEventListener('keydown', whiteboardSelectionKeyEvent, false);
        });
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box ref={wbWrapperRef} sx={{ width: "100%", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Paper sx={{ borderRadius: "10px", overflow: "auto", width: `${wbParentWidth}px`, height: `${wbParentHeight}px` }} elevation={3}>
                    <Box>
                        {
                            activeUsers.map((user) => {
                                activeUsersRefs[user.uId] = React.createRef(null);
                                activeUsersBrushes[user.uId] = new fabric.PencilBrush();
                                return (
                                    <Avatar
                                        ref={activeUsersRefs[user.uId]}
                                        style={{
                                            position: 'absolute',
                                            width: '2rem',
                                            height: '2rem'
                                        }
                                        }>
                                        {user.uName.toString().slice(2, 5)}
                                    </Avatar>
                                )
                            })
                        }
                    </Box>
                    <canvas style={{ borderRadius: "10px" }} width="100px" height="100px" ref={fabricRef} />
                </Paper>
            </Box>
        </Box>
    );
}

export default DrawingBoard;