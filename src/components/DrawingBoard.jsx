import React, {useEffect, useRef} from 'react';
import { fabric } from 'fabric'
import { Box } from '@mui/material';

const DrawingBoard = () => {
    const whiteBoardRef = useRef(null);
    const captureWhiteBoard = (whiteBoard) => {
        var rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });

        whiteBoard.add(rect);
    }

    useEffect(() => {
        const whiteBoard = new fabric.Canvas(whiteBoardRef.current, {

        });

        captureWhiteBoard (whiteBoard);
        console.log ("WhiteBoard Instance Capture Sent...")
    }, []);

    return (
        <Box>
            <canvas width="800" height="500" ref={whiteBoardRef} />
        </Box>
    );
}

export default DrawingBoard;