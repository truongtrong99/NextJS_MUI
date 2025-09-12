'use client'
import { useWaveSurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio')
    const containerRef = useRef<HTMLDivElement | null>(null);
    const optionsMemo = useMemo(() => {
        return {
            waveColor: 'rgb(200, 0, 200)',
            progressColor: 'rgb(100, 0, 100)',
            url: `/api?audio=${fileName}`,
        }
    }, [])
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);
    useEffect(() => {
        if (!wavesurfer) return;
        setIsPlaying(false)
        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false))
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

    return <>
        <div ref={containerRef}>WaveTrack</div>
        <button onClick={onPlayClick}>
            {isPlaying == true ? 'Pause' : 'Play'}
        </button>
    </>
}
export default WaveTrack;