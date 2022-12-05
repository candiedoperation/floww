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

import * as React from 'react';
import { fabric } from 'floww-whiteboard'
import { Divider, Slider, Typography, FormControlLabel, Switch } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";
import ColorPaletteBubbles from './ColorPaletteBubbles';
import getFlowwBrushObject from '../middleware/getFlowwBrushObject';
import getFlowwCursor from '../middleware/getFlowwCursor';

const CollabViewPenSettings = (props) => {
    const [isDrawingMode, setIsDrawingMode] = React.useState(false);
    const [isEraserMode, setIsEraserMode] = React.useState(false);
    const [nibWidth, setNibWidth] = React.useState(1);
    const [brushType, setBrushType] = React.useState('PencilBrush');
    const [whiteboardObject, setWhiteboardObject] = React.useState({});
    const [nibColor, setNibColor] = React.useState("#000000");

    React.useEffect(() => {
        setWhiteboardObject(props.whiteboardObject);
    }, [props.whiteboardObject]);

    React.useEffect(() => {
        whiteboardObject.isDrawingMode = isDrawingMode;
        if (isDrawingMode) {
            whiteboardObject.freeDrawingBrush = getFlowwBrushObject(brushType, whiteboardObject);
            whiteboardObject.freeDrawingBrush.width = nibWidth;
            whiteboardObject.freeDrawingBrush.color = nibColor;
        }
    }, [isDrawingMode]);

    React.useEffect(() => {
        if (whiteboardObject.freeDrawingBrush) {
            if (isEraserMode == true) {
                whiteboardObject.freeDrawingBrush = getFlowwBrushObject('EraserBrush', whiteboardObject);
                whiteboardObject.freeDrawingCursor = getFlowwCursor('EraserPen');
                whiteboardObject.freeDrawingBrush.width = nibWidth;
            } else {
                whiteboardObject.freeDrawingBrush = getFlowwBrushObject(brushType, whiteboardObject);
                whiteboardObject.freeDrawingCursor = getFlowwCursor('LaserPen');
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
            whiteboardObject.freeDrawingBrush = getFlowwBrushObject(brushType, whiteboardObject);
            whiteboardObject.freeDrawingBrush.width = nibWidth;
            whiteboardObject.freeDrawingBrush.color = nibColor;
        }
    }, [brushType]);

    return (
        <Box sx={{ ...props.sx, padding: '15px' }}>
            <Typography variant="h6">Pen Settings</Typography>
            <FormControlLabel control={<Switch disabled={whiteboardObject == null ? true : false} checked={isDrawingMode} onChange={() => { setIsDrawingMode(!isDrawingMode) }} />} label="Freeform Drawing" />
            <FormControlLabel control={<Switch disabled={whiteboardObject == null || isDrawingMode == false ? true : false} checked={isEraserMode} onChange={() => { setIsEraserMode(!isEraserMode) }} />} label="Erase Mode" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Type</Typography>
            <Select
                value={brushType}
                disabled={(whiteboardObject == null || isEraserMode == true || isDrawingMode == false) ? true : false}
                size='small'
                onChange={(e) => { setBrushType(e.target.value) }}
                sx={{ width: '100%', marginTop: '10px' }}
            >
                <MenuItem value={'PencilBrush'}>Pen</MenuItem>
                <MenuItem value={'CircleBrush'}>Bubbles</MenuItem>
                <MenuItem value={'SprayBrush'}>Spray Can</MenuItem>
            </Select>
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>{(isEraserMode ? 'Eraser Width' : 'Nib Width')}</Typography>
            <Slider onChangeCommitted={(e, w) => { setNibWidth(w) }} min={1} max={50} step={1} disabled={(whiteboardObject == null || isDrawingMode == false) ? true : false} defaultValue={1} aria-label="Default" valueLabelDisplay="auto" />
            <Typography variant="p" component="div" sx={{ marginTop: '10px' }}>Nib Color</Typography>
            <ColorPaletteBubbles disabled={(whiteboardObject == null || isDrawingMode == false) ? true : false} colorPicked={(nC) => { setNibColor(nC) }} sx={{ marginTop: '10px' }}></ColorPaletteBubbles>
        </Box>
    );
}

export default CollabViewPenSettings;