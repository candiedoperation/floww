import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric'
import { Box, Paper } from '@mui/material';

const DrawingBoard = () => {
    const whiteboardRef = React.createRef(null);
    const wbWrapperRef = React.useRef(null);
    const [wbParentWidth, setWbParentWidth] = React.useState(1);
    const [wbParentHeight, setWbParentHeight] = React.useState(1);

    useEffect(() => {
        let timedId = null;
        enforceWrapperAspects();
        initializeCanvas();

        window.addEventListener('resize', () => {
            wrapperTo1px();
            clearTimeout(timedId);

            timedId = setTimeout(() => {
                enforceWrapperAspects();
                console.log(`${window.innerWidth}x${window.innerHeight}`);
            }, 250);
        });
    }, []);

    const initializeCanvas = () => {
        console.log("init");
        updateCanvasAspect();
    }

    const wrapperTo1px = () => {
        setWbParentWidth(1);
        setWbParentHeight(1);
    }

    const enforceWrapperAspects = (aspectRatio) => {
        if (!aspectRatio) aspectRatio = 16/9;
        let wrapperHeight = wbWrapperRef.current.clientHeight;
        let wrapperWidth = wbWrapperRef.current.clientWidth;

        let plausibleHeight = (1/aspectRatio) * wrapperWidth;
        let plausibleWidth = aspectRatio * wrapperHeight;

        if (plausibleHeight <= wrapperHeight) {
            // Try constraining width
            setWbParentWidth(wrapperWidth);
            setWbParentHeight(plausibleHeight);
        } else if (plausibleWidth <= wrapperWidth) {
            // Resort to constraining height
            setWbParentWidth(plausibleWidth);
            setWbParentHeight(wrapperHeight);
        } else { console.error ("CNS ERR!") }

        console.log(`${wrapperWidth}x${wrapperHeight}`);
        //setWbParentWidth(`${estWidth}px`);
        //console.log("setEstWidth " + estWidth + "px");
    }

    const updateCanvasAspect = (newWidth, newHeight) => {
        if (!(newWidth == null || newHeight == null)) {
            console.log("params present")
        } else {
            console.log("defaulting to parent size");
        }
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
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh"}}>
            <Box>InfoBar Top</Box>
            <Box ref={wbWrapperRef} sx={{ width: "100%", flexGrow: 1, margin: "10px" }}>
                <Paper sx={{ borderRadius: "10px", overflow: "auto", width: `${wbParentWidth}px`, height: `${wbParentHeight}px` }} elevation={3}>
                    <canvas style={{ borderRadius: "10px" }} width="100px" height="100px" ref={fabricRef} />
                </Paper>
            </Box>
            <Box>InfoBar Bottom</Box>
        </Box>
    );
}

export default DrawingBoard;