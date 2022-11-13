import * as React from 'react';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import moment from 'moment';

const CollabViewComments = (props) => {
    const commentBottomRef = React.useRef();
    const [comments, setComments] = React.useState([]);
    const [msgValue, setMsgValue] = React.useState("");

    React.useEffect(() => {
        props.socketIO.on('cbv-comment', (commentData) => {
            setComments((comments) => [...comments, commentData])
        })
    }, []);

    React.useEffect(() => {
        if (commentBottomRef.current) commentBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    const sendMessage = () => {
        if (msgValue.trim().length > 0) {
            setComments((comments) => [...comments, {
                uName: props.uName,
                message: msgValue,
                time: moment().toISOString()
            }]);

            props.socketIO.emit('cbv-comment', {
                roomName: props.roomName,
                uName: props.uName,
                uId: props.socketIO.id,
                uName: props.uName,
                message: msgValue
            });

            setMsgValue("");
        }
    }

    return (
        <Box sx={{ ...props.sx, height: '100%', flexDirection: 'column' }}>
            <Box sx={{ padding: '8px', flexGrow: 1, maxHeight: '100%', overflowY: 'auto' }}>
                <Box sx={{ display: (comments.length == 0 ? 'flex' : 'none'), flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'text.disabled' }}>
                    <SmsFailedIcon fontSize='large'></SmsFailedIcon>
                    <Typography variant="h6">No Messages</Typography>
                </Box>
                {
                    comments.map((comment) => {
                        return (
                            <Box sx={{ display: 'flex', margin: '5px', flexDirection: 'column' }}>
                                <Paper sx={{ padding: '5px', display: 'flex', flexDirection: 'column' }} variant="outlined">
                                    <Typography variant="caption">{comment.uName}</Typography>
                                    <Typography variant="p">{comment.message}</Typography>
                                </Paper>
                                <Typography mt="3px" sx={{ alignSelf: 'end' }} variant="caption">
                                    {moment(comment.time).local().format("hh:mm A")}
                                </Typography>
                            </Box>
                        )
                    })
                }
                <Box ref={commentBottomRef}></Box>
            </Box>
            <Box sx={{ margin: '8px', display: 'flex' }}>
                <OutlinedInput placeholder='Message' variant="outlined" value={msgValue} onKeyDown={(k) => { if (k.key == 'Enter') sendMessage() }} onChange={(e) => { setMsgValue(e.target.value) }} endAdornment={
                    <InputAdornment position='end'>
                        <IconButton disabled={(msgValue.trim().length == 0)} style={{ marginLeft: '3px', borderRadius: '10%' }} onClick={sendMessage} size="small">
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                } />
            </Box>
        </Box>
    )
}

export default CollabViewComments;