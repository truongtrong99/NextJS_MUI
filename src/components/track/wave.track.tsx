'use client'
import { useWaveSurfer } from '@/utils/customHook';
import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';


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
    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);
    return <div ref={containerRef}>WaveTrack</div>;
}
export default WaveTrack;