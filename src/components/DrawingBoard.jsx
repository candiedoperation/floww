import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric'
import { Box, Paper } from '@mui/material';

const DrawingBoard = (props) => {
    let whiteboardParams = { width: 100, height: 100, translateRatio: 1 };
    const whiteboardRef = React.createRef(null);
    const wbWrapperRef = React.useRef(null);
    const [wbParentWidth, setWbParentWidth] = React.useState(1);
    const [wbParentHeight, setWbParentHeight] = React.useState(1);

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
        -nces, We compare ratios with a 640 x 360 resolution*/
        let scalingFactor = newWidth / 640;
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
        whiteboard.isDrawingMode = true;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Box ref={wbWrapperRef} sx={{ width: "100%", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Paper sx={{ borderRadius: "10px", overflow: "auto", width: `${wbParentWidth}px`, height: `${wbParentHeight}px` }} elevation={3}>
                    <canvas style={{ borderRadius: "10px" }} width="100px" height="100px" ref={fabricRef} />
                </Paper>
            </Box>
        </Box>
    );
}

export default DrawingBoard;