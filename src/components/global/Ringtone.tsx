import React, { useEffect, useRef } from 'react';
import { useSocket } from '@/providers/socket.provider';
const Ringtone: React.FC = () => {
    const { callState } = useSocket();
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!audioRef.current) return;

        if (callState?.status === 'incoming') {
            audioRef.current.loop = true;
            audioRef.current.play().catch((e) => {
                console.error('Audio play failed:', e);
                // Handle browsers that block autoplay
                // Might need to show a "click to play" button
            });
        }

        if (callState?.status !== 'incoming' && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [callState]);

    return <audio ref={audioRef} src={`/ringtones/default.mp3'}`} preload='auto' />;
};

export default Ringtone;
