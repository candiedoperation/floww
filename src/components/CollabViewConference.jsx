import * as React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as virtClassroom from "mediasoup-client";

const CollabViewConference = (props) => {
    const [AVStreams, SetAVStreams] = React.useState([]);
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
            <Paper sx={{ width: '100%', height: '214px', overflow: 'hidden', marginBottom: '8px' }} variant='outlined'>
                <video
                    ref={internalVideoRef}
                    autoPlay={true}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
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