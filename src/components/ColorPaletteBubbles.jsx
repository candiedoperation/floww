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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';

const ColorPaletteBubbles = (props) => {
    const [colorsAvailable, setColorsAvailable] = React.useState({});
    let colorButtonObjects = [];

    React.useState(() => {
        setColorsAvailable({
            'Deep Yellow': '#ffbf16',
            'True Orange': '#f5630d',
            'Deep Pink': '#ff0066',
            'Tomato Red': '#e61226',
            'True Purple': '#5c2d8f',
            'Rainbow Violet': '#aa0089',
            'Deep Blue': '#014e8a',
            'Aquatic Blue': '#009fd8',
            'Sky Blue': '#32ccfe',
            'Dark Green': '#008c3b',
            'Light Green': '#66cb00',
            'Pitch Black': '#000000',
            'Lightning Gray': '#333333',
            'Concrete Gray': '#839297',
            'Pure White': '#ffffff',
            'Deer Brown': '#7a5446'
        });
    }, []);

    Object.keys(colorsAvailable).forEach((color) => {
        colorButtonObjects.push(
            <Tooltip title={color} placement="top">
                <Chip
                    disabled={props.disabled}
                    variant="contained"
                    onClick={() => { props.colorPicked(colorsAvailable[color]) }}
                    sx={{ boxShadow: 3 }}
                    style={{
                        height: '40px',
                        width: '40px',
                        borderRadius: '40%',
                        margin: '4px',
                        backgroundColor: colorsAvailable[color]
                    }}
                ></Chip>
            </Tooltip>
        )
    })

    return (
        <Box sx={{ ...props.sx }}>
            {colorButtonObjects}
        </Box>
    );
}

export default ColorPaletteBubbles;