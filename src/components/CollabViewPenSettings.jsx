import * as React from 'react';
import { fabric } from 'floww-whiteboard'
import { Divider, Slider, Typography, FormControlLabel, Switch } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";
import ColorPaletteBubbles from './ColorPaletteBubbles';

const CollabViewPenSettings = (props) => {
    const [isDrawingMode, setIsDrawingMode] = React.useState(false);
    const [isEraserMode, setIsEraserMode] = React.useState(false);
    const [nibWidth, setNibWidth] = React.useState(0);
    const [brushType, setBrushType] = React.useState('PencilBrush');
    const [whiteboardObject, setWhiteboardObject] = React.useState({});
    const [nibColor, setNibColor] = React.useState("#000000");

    const getBrushObject = (brushName) => {
        switch (brushName) {
            case 'PencilBrush': {
                return new fabric.PencilBrush(whiteboardObject);
            }

            case 'EraserBrush': {
                return new fabric.EraserBrush(whiteboardObject);
            }

            case 'CircleBrush': {
                return new fabric.CircleBrush(whiteboardObject);
            }

            case 'SprayBrush': {
                return new fabric.SprayBrush(whiteboardObject);
            }

            default: {
                return new fabric.PencilBrush(whiteboardObject);
            }
        }
    }

    React.useEffect(() => {
        setWhiteboardObject(props.whiteboardObject);
    }, [props.whiteboardObject]);

    React.useEffect(() => {
        whiteboardObject.isDrawingMode = isDrawingMode;
    }, [isDrawingMode]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) {
            if (isEraserMode == true) {
                whiteboardObject.freeDrawingBrush = getBrushObject('EraserBrush');
                whiteboardObject.freeDrawingBrush.width = nibWidth;
            } else {
                whiteboardObject.freeDrawingBrush = getBrushObject(brushType);
                whiteboardObject.freeDrawingBrush.width = nibWidth;
                whiteboardObject.freeDrawingBrush.color = nibColor;
            }
        }
    }, [isEraserMode]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) whiteboardObject.freeDrawingBrush.width = nibWidth;
    }, [nibWidth]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) whiteboardObject.freeDrawingBrush.color = nibColor;
    }, [nibColor]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) {
            whiteboardObject.freeDrawingBrush = getBrushObject(brushType);
            whiteboardObject.freeDrawingBrush.width = nibWidth;
            whiteboardObject.freeDrawingBrush.color = nibColor;
        }
    }, [brushType]);

    return (
        <Box sx={{ ...props.sx, padding: '15px', marginBottom: '70px' }}>
            <Typography variant="h6">Pen Settings</Typography>
            <FormControlLabel control={<Switch disabled={whiteboardObject == null ? true : false} checked={isDrawingMode} onChange={() => { setIsDrawingMode(!isDrawingMode) }} />} label="Freeform Drawing" />
            <FormControlLabel control={<Switch disabled={whiteboardObject == null ? true : false} checked={isEraserMode} onChange={() => { setIsEraserMode(!isEraserMode) }} />} label="Erase Mode" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Type</Typography>
            <Select
                value={brushType}
                disabled={(whiteboardObject == null || isEraserMode == true) ? true : false}
                size='small'
                onChange={(e) => { setBrushType(e.target.value) }}
                sx={{ width: '100%', marginTop: '10px' }}
            >
                <MenuItem value={'PencilBrush'}>Pen</MenuItem>
                <MenuItem value={'CircleBrush'}>Bubbles</MenuItem>
                <MenuItem value={'SprayBrush'}>Spray Can</MenuItem>
            </Select>
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Width</Typography>
            <Slider onChangeCommitted={(e, w) => { setNibWidth(w) }} min={1} max={50} step={1} disabled={whiteboardObject == null ? true : false} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Color</Typography>
            <ColorPaletteBubbles colorPicked={(nC) => { setNibColor(nC) }} sx={{ marginTop: '10px' }}></ColorPaletteBubbles>
        </Box>
    );
}

export default CollabViewPenSettings;