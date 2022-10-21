import { Chip } from "@mui/material";
import { Box } from "@mui/system";

const ColorPaletteBubbles = (props) => {
    return (
        <Box sx={{ display: "flex", ...props.sx, maxWidth: "100%" }} flexWrap={true}>
            <Chip style={{ backgroundColor: "red", width: '35px', height: '35px', borderRadius: '50%' }} onClick={() => { props.setColor('#454545') }}></Chip>
        </Box>
    );
}

export default ColorPaletteBubbles;