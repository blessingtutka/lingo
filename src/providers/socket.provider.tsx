// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    callState: CallState | null;
    setCallState: React.Dispatch<React.SetStateAction<CallState | null>>;
}

interface CallState {
    callId: string;
    status: 'requesting' | 'incoming' | 'ongoing' | 'ended' | 'rejected' | 'missed';
    peerId?: string;
    otherPeerId?: string;
    otherUserId: string;
    isCaller: boolean;
}

const SocketContext = createContext<SocketContextType>({} as SocketContextType);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [callState, setCallState] = useState<CallState | null>(null);

    useEffect(() => {
        const socketInstance = io(import.meta.env.VITE_SOCKET_BASE_URL, {
            withCredentials: true,
            autoConnect: false,
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        const onConnect = () => {
            setIsConnected(true);
            console.log('Socket connected');
        };

        const onDisconnect = () => {
            setIsConnected(false);
            console.log('Socket disconnected');
        };

        const onIncomingCall = (data: { callerId: string; callId: string; peerId: string }) => {
            setCallState({
                callId: data.callId,
                status: 'incoming',
                otherUserId: data.callerId,
                peerId: data.peerId,
                isCaller: false,
            });
        };

        const onCallAccepted = (data: { callerPeerId: string; receiverPeerId: string }) => {
            if (!callState) return;

            setCallState((prev) => ({
                ...prev!,
                status: 'ongoing',
                otherPeerId: callState.isCaller ? data.receiverPeerId : data.callerPeerId,
            }));
        };

        const onCallRejected = (data: { callId: string }) => {
            if (callState?.callId === data.callId) {
                setCallState((prev) => ({
                    ...prev!,
                    status: 'rejected',
                }));
                setTimeout(() => setCallState(null), 3000);
            }
        };

        const onCallEnded = (data: { callId: string }) => {
            if (callState?.callId === data.callId) {
                setCallState((prev) => ({
                    ...prev!,
                    status: 'ended',
                }));
                setTimeout(() => setCallState(null), 3000);
            }
        };

        const onCallMissed = (data: { callId: string }) => {
            if (callState?.callId === data.callId) {
                setCallState((prev) => ({
                    ...prev!,
                    status: 'missed',
                }));
                setTimeout(() => setCallState(null), 3000);
            }
        };

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('incoming-call', onIncomingCall);
        socket.on('call-accepted', onCallAccepted);
        socket.on('call-rejected', onCallRejected);
        socket.on('call-ended', onCallEnded);
        socket.on('call-missed', onCallMissed);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('incoming-call', onIncomingCall);
            socket.off('call-accepted', onCallAccepted);
            socket.off('call-rejected', onCallRejected);
            socket.off('call-ended', onCallEnded);
            socket.off('call-missed', onCallMissed);
        };
    }, [socket, callState]);

    return <SocketContext.Provider value={{ socket, isConnected, callState, setCallState }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
