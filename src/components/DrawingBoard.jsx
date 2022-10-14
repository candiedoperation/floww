import React, {useEffect, useRef} from 'react';
import { fabric } from 'fabric'
import { Box } from '@mui/material';

const DrawingBoard = () => {
    const whiteboardRef = React.createRef(null);
    const fabricRef = React.useCallback((element) => {
      if (!element) return whiteboardRef.current?.dispose();
  
      whiteboardRef.current = new fabric.Canvas(element);
      manageWhiteboard(whiteboardRef.current);
    }, []);

    const manageWhiteboard = (whiteboard) => {
        whiteboard.isDrawingMode = true;
    }

    return (
        <Box>
            <canvas width="800px" height="500px" ref={fabricRef} />
        </Box>
    );
}

export default DrawingBoard;