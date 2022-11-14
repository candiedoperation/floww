import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import SettingsIcon from '@mui/icons-material/Settings';
import * as virtClassroom from "mediasoup-client";

const CollabViewConference = (props) => {
    const [AVStreams, SetAVStreams] = React.useState([]);
    const [videoStreaming, setVideoStreaming] = React.useState(false);
    const [audioStreaming, setAudioStreaming] = React.useState(false);
    const [compatibilityErr, setCompatibilityErr] = React.useState(false);

    //Initialize SFU Server Connection...
    const virtClassroomDevice = new virtClassroom.Device();
    virtClassroomDevice.load();

    const getMediaStream = (stream) => {
        SetAVStreams((AVStreams) => [...AVStreams, {
            videoFeed: stream
        }])
    }

    const getLocalMediaStream = () => {
        navigator.getUserMedia = (
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );

        navigator.getUserMedia({
            audio: false,
            video: { facingMode: 'user' }
        }, getMediaStream, (error) => {
            setCompatibilityErr(true);
            console.log(error);
        })
    }

    const AVPreview = (internalProps) => {
        const internalVideoRef = React.useRef(null);
        React.useEffect(() => {
            internalVideoRef.current.srcObject = internalProps.videoFeed;
        }, []);

        return (
            <Paper sx={{ width: '100%', height: '165px', overflow: 'hidden', marginBottom: '8px' }}>
                <video
                    ref={internalVideoRef}
                    autoPlay={true}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        background: '#000000'
                    }}
                >
                </video>
            </Paper>
        )
    }

    React.useEffect(() => {
        //Initialize Local Media Stream
        getLocalMediaStream();
    }, []);

    return (
        <Box sx={{ ...props.sx, height: '100%', flexDirection: 'column' }}>
            <Box sx={{ padding: '8px' }}>
                <ButtonGroup variant="outlined" fullWidth>
                    <Button onClick={() => { setVideoStreaming(!videoStreaming) }}>{(videoStreaming === true ? <VideocamOffIcon /> : <VideocamIcon />)}</Button>
                    <Button onClick={() => { setAudioStreaming(!audioStreaming) }}>{(audioStreaming === true ? <MicOffIcon /> : <MicIcon />)}</Button>
                    <Button><SettingsIcon /></Button>
                </ButtonGroup>
            </Box>
            <Box sx={{ padding: '8px' }}>
                {
                    AVStreams.map((AVStream) => {
                        return (
                            <AVPreview videoFeed={AVStream.videoFeed}></AVPreview>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

export default CollabViewConference;