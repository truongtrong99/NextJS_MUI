import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js';

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}

export const useScript = (url: string) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

//WaveSurfer hook
export const useWaveSurfer = (containerRef: React.RefObject<HTMLDivElement>, options: Omit<WaveSurferOptions, 'container'>) => {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
            renderFunction: (channels, ctx) => {
                const { width, height } = ctx.canvas;
                const barWidth = options.barWidth || 2;
                const barGap = options.barGap || 1;
                const barRadius = options.barRadius || 0;
                const separationLineHeight = 0.5; // Height of the separation line

                const barCount = Math.floor(width / (barWidth + barGap));
                const step = Math.floor(channels[0].length / barCount);

                const topPartHeight = height * 0.7; // Define top part height
                const bottomPartHeight = height * 0.3; // Define bottom part height

                ctx.beginPath();

                // Render bars based on the image implementation
                for (let i = 0; i < barCount; i++) {
                    const x = i * (barWidth + barGap);
                    const dataIndex = i * step;
                    const amplitude = Math.abs(channels[0][dataIndex] || 0);

                    // Top part
                    const topBarHeight = amplitude * topPartHeight;
                    ctx.fillRect(x, (topPartHeight - topBarHeight) / 2, barWidth, topBarHeight);

                    // Bottom part
                    const bottomBarHeight = amplitude * bottomPartHeight;
                    ctx.fillRect(x, topPartHeight + separationLineHeight, barWidth, bottomBarHeight);
                }
            }
        });

        setWavesurfer(ws);

        return () => {
            ws.destroy();
        };
    }, [containerRef, options]);

    return wavesurfer;
}
