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
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import SendIcon from "@mui/icons-material/Send";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { InputAdornment, OutlinedInput } from '@mui/material';
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