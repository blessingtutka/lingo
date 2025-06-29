import { useEffect, useState } from 'react';
import { useSocket } from '@/providers/socket.provider';
import Peer from 'peerjs';

export const useCall = (userId: string) => {
    const { socket, callState, setCallState } = useSocket();
    const [peer, setPeer] = useState<Peer | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        if (!userId) return;

        const newPeer = new Peer(userId);
        setPeer(newPeer);

        newPeer.on('open', (id) => {
            console.log('PeerJS ready with ID:', id);
        });

        return () => {
            newPeer.destroy();
        };
    }, [userId]);

    // Handle incoming calls
    useEffect(() => {
        if (!peer || !callState || callState.status !== 'incoming') return;

        const handleCall = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);

                peer.on('call', (call) => {
                    call.answer(stream);
                    call.on('stream', (remoteStream) => {
                        setRemoteStream(remoteStream);
                    });
                });
            } catch (error) {
                console.error('Error getting media devices:', error);
            }
        };

        handleCall();
    }, [peer, callState]);

    const initiateCall = async (receiverId: string) => {
        if (!socket || !peer) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setLocalStream(stream);

            socket.emit('call-user', { callerId: userId, receiverId });

            setCallState({
                callId: '',
                status: 'requesting',
                otherUserId: receiverId,
                isCaller: true,
            });

            peer.on('call', (call) => {
                call.answer(stream);
                call.on('stream', (remoteStream) => {
                    setRemoteStream(remoteStream);
                });
            });
        } catch (error) {
            console.error('Error initiating call:', error);
        }
    };

    const acceptCall = () => {
        if (!socket || !callState || callState.status !== 'incoming') return;

        socket.emit('accept-call', {
            callId: callState.callId,
            receiverId: userId,
        });
    };

    const rejectCall = () => {
        if (!socket || !callState || callState.status !== 'incoming') return;

        socket.emit('reject-call', {
            callId: callState.callId,
            receiverId: userId,
        });
    };

    const endCall = () => {
        if (!socket || !callState) return;

        socket.emit('end-call', {
            callId: callState.callId,
            userId: userId,
        });
    };

    return {
        initiateCall,
        acceptCall,
        rejectCall,
        endCall,
        callState,
        localStream,
        remoteStream,
    };
};
