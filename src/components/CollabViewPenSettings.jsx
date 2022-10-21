import * as React from 'react';
import { Divider, Slider, Typography, FormControlLabel, Switch } from "@mui/material";
import { Box } from "@mui/system";
import ColorPaletteBubbles from './ColorPaletteBubbles';

const CollabViewPenSettings = (props) => {
    const [isDrawingMode, setIsDrawingMode] = React.useState(false);
    const [nibWidth, setNibWidth] = React.useState(0);
    const [whiteboardObject, setWhiteboardObject] = React.useState({});
    const [nibColor, setNibColor] = React.useState("#000000");

    React.useEffect(() => {
        setWhiteboardObject(props.whiteboardObject);
    }, [props.whiteboardObject]);

    React.useEffect(() => {
        whiteboardObject.isDrawingMode = isDrawingMode;
    }, [isDrawingMode]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) whiteboardObject.freeDrawingBrush.width = nibWidth;
    }, [nibWidth]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) whiteboardObject.freeDrawingBrush.color = nibColor;
    }, [nibColor]);

    return (
        <Box sx={{ ...props.sx, padding: '15px' }}>
            <Typography variant="h6">Pen Settings</Typography>
            <FormControlLabel control={<Switch disabled={whiteboardObject == null ? true : false} checked={isDrawingMode} onChange={() => { setIsDrawingMode(!isDrawingMode) }} />} label="Freeform Drawing" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Width</Typography>
            <Slider onChangeCommitted={(e, w) => { setNibWidth(w) }} min={1} max={15} step={1} disabled={whiteboardObject == null ? true : false} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Color</Typography>
            <ColorPaletteBubbles colorPicked={(nC) => { setNibColor(nC) }} sx={{ marginTop: '10px' }}></ColorPaletteBubbles>
        </Box>
    );
}

export default CollabViewPenSettings;