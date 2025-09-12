'use client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
//WaveSurfer hook
const useWaveSurfer = (containerRef: any, options: any) => {
    const [wavesurfer, setWavesurfer] = useState<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        });

        setWavesurfer(ws);

        return () => {
            ws.destroy();
        };
    }, [containerRef, options]);

    return wavesurfer;
}

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
    // const options = {
    //     waveColor: 'rgb(200, 0, 200)',
    //     progressColor: 'rgb(100, 0, 100)',
    //     url: `/api?audio=${fileName}`,
    // }
    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);
    // useEffect(() => {
    //     if (containerRef.current) {
    //         const wavesurfer = WaveSurfer.create({
    //             container: containerRef.current,
    //             waveColor: 'rgb(200, 0, 200)',
    //             progressColor: 'rgb(100, 0, 100)',
    //             url: `/api?audio=${fileName}`,
    //         })
    //     }

    // }, [])
    return <div ref={containerRef}>WaveTrack</div>;
}
export default WaveTrack;