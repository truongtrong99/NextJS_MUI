'use client'
import { useWaveSurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [time, setTime] = useState<string>('0:00');
    const [duration, setDuration] = useState<string>('0:00');
    const hoverRef = useRef<HTMLDivElement | null>(null);
    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {

        let gradient, progressGradient;
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')!
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }
        return {
            waveColor: gradient,
            progressColor: progressGradient,
            url: `/api?audio=${fileName}`,
            barWidth: 3,
            height: 100,
        }
    }, [])
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);
    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false)
        const hover = hoverRef.current!
        const waveform = containerRef.current!

        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration));
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime));
            })
        ]
        return () => {
            subscriptions.forEach(unsub => unsub());
        }
    }, [wavesurfer]);

    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }
    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]
    const calcLeft = (moment: number) => {
        const hardCodeDuration = 199;
        const percent = (moment / hardCodeDuration) * 100;
        return `${percent}%`;
    }
    return <>
        <div style={{ marginTop: 20 }}>
            <div style={{
                display: 'flex',
                gap: 15,
                padding: 20,
                height: 400,
                background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
            }}>
                <div className="left"
                    style={{
                        width: '75%',
                        height: 'calc(100% - 10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                    <div className="info" style={{ display: 'flex' }}>
                        <div>
                            <div
                                onClick={onPlayClick}
                                style={{
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    background: "#EE772F",
                                    position: "absolute",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}>

                                {isPlaying ?
                                    <PauseIcon
                                        sx={{ fontSize: 30, color: '#fff' }} /> :
                                    <PlayArrowIcon
                                        sx={{ fontSize: 30, color: '#fff' }} />}
                            </div>
                        </div>
                        <div style={{ marginLeft: 70 }}>
                            <div style={{
                                padding: '0px 5px',
                                background: '#333',
                                fontSize: 30,
                                width: "fit-content",
                                color: '#fff',
                            }}>
                                Music Name
                            </div>
                            <div style={{
                                padding: '0px 5px',
                                marginTop: 10,
                                background: '#333',
                                fontSize: 20,
                                width: "fit-content",
                                color: '#fff',
                            }}>
                                Author
                            </div>
                        </div>
                    </div>
                    <div ref={containerRef} className="wave-form-container" >
                        <div className='time' id="time">{time}</div>
                        <div className='duration' id="duration">{duration}</div>
                        <div className='hover-wave' ref={hoverRef}></div>
                        <div className='overlay'
                            style={{
                                position: 'absolute',
                                height: '30px',
                                width: '100%',
                                bottom: 0,
                                backdropFilter: 'brightness(0.5)',
                            }}>

                        </div>
                        <div className="comments" style={{ position: "relative" }}>
                            {
                                arrComments.map(cmt => (
                                    <img
                                        className={'' + cmt.id}
                                        key={cmt.id}
                                        style={{
                                            height: 20, width: 20, position: 'absolute', top: 71, zIndex: 20
                                            , left: calcLeft(cmt.moment)
                                        }} src={cmt.avatar} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div
                        style={

                            {
                                marginTop: 20,
                                height: "200px",
                                width: "200px",
                                background: "gray"
                            }
                        }>


                    </div>

                </div>
            </div>
        </div>
    </>
}
export default WaveTrack;