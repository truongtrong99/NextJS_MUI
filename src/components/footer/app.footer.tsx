'use client';
import { useHasMounted } from '@/utils/customHook';
import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) return (<></>);
    return <div>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2" }}>
            <Container sx={{ display: "flex", gap: 10 }}>
                <AudioPlayer
                    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                    volume={0.5}
                    // Try other props!
                    style={{ boxShadow: 'none', backgroundColor: "#f2f2f2" }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        justifyContent: "center",
                        minWidth: 100,
                    }}>
                    <div style={{ color: "#ccc" }}>Tro</div>
                    <div style={{ color: "black" }}>Music Name</div>
                </div>
            </Container>
        </AppBar>
    </div>
}

export default AppFooter;