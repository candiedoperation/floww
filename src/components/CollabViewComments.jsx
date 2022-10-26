import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const CollabViewComments = (props) => {
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        props.socketIO.on('cbv-getComment', (commentData) => {
            setComments((comments) => [...comments, commentData])
        })
    }, []);

    return (
        <Box sx={{ ...props.sx, height: '100%', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, padding: '8px' }}>
                <Paper sx={{ padding: '5px' }} variant="outlined">
                    <Typography variant="caption">Haritha Thirumalairajan</Typography><br/>
                    <Typography variant="p">Who authored it?</Typography>
                </Paper>
            </Box>
            <Box sx={{ padding: '8px', display: 'flex' }}>
                <TextField  label="Message" variant="outlined" />
                <IconButton style={{marginLeft: '3px', borderRadius: '10%'}} size="small">
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default CollabViewComments;