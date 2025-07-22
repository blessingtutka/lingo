import { Phone, PhoneIncoming, PhoneForwarded, PhoneOff, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/providers/user.provider';
import { getUserContactCalls } from '@/services/call.service';
import { getCallDuration, formatCallTime } from '@/lib/utils';

export const mockCalls: Call[] = [
    {
        id: 'call-001',
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        endedAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
        status: 'ENDED',
        callerId: 'contact-1',
        receiverId: 'efa3a901-5a9f-4fdb-9474-d9f0f02a06cf',
    },
    {
        id: 'call-002',
        startedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
        endedAt: null,
        status: 'MISSED',
        callerId: 'contact-1',
        receiverId: 'efa3a901-5a9f-4fdb-9474-d9f0f02a06cf',
    },
    {
        id: 'call-003',
        startedAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 mins ago
        endedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        status: 'ENDED',
        callerId: 'efa3a901-5a9f-4fdb-9474-d9f0f02a06cf',
        receiverId: 'contact-1',
    },
];

export function Contact() {
    const { user } = useUser();
    const { contactId } = useParams<{ contactId: string }>();

    const placeholderContact = {
        id: 'placeholder-id',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        avatar: '',
    };

    const contact = user?.contacts?.find((c) => c.id === contactId) || placeholderContact;
    const [calls, setCalls] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contactId) return;
        setLoading(true);
        getUserContactCalls(contactId)
            .then((res) => setCalls(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [contactId]);

    if (!contact) return <Navigate to='/user' replace />;

    const getCallType = (call: Call) => {
        if (call.status === 'MISSED') return 'missed';
        return call.callerId === user?.id ? 'outgoing' : 'incoming';
    };

    return (
        <div className='relative h-[calc(100vh-120px)]'>
            <Card className='bg-muted rounded-lg shadow p-4 mt-4 border border-border h-full flex flex-col'>
                <div className='flex items-center gap-4 mb-4'>
                    <Link to='/user' className='p-1 rounded-full hover:bg-gray-100'>
                        <ArrowLeft size={20} />
                    </Link>
                    <h3 className='text-lg font-semibold'>{contact.name}'s Call History</h3>
                </div>

                {loading && <p className='text-center py-4'>Loading calls...</p>}
                {error && <p className='text-red-500 text-center py-4'>{error}</p>}

                {!loading && !error && (
                    <ul className='space-y-2 overflow-y-auto flex-1'>
                        {mockCalls.length === 0 ? (
                            <li className='text-center py-8 text-gray-500'>No calls found</li>
                        ) : (
                            mockCalls.map((call) => {
                                const callType = getCallType(call);
                                const isMissed = callType === 'missed';
                                const isOutgoing = callType === 'outgoing';
                                const duration = getCallDuration(call.startedAt, call.endedAt);

                                return (
                                    <li key={call.id} className={`${isOutgoing ? '' : 'justify-end '}flex   cursor-pointer`}>
                                        <div
                                            className={`flex p-3 rounded-lg border group hover:bg-gray-50 transition-colors justify-between items-center w-fit`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <div
                                                    className={`p-2 rounded-full ${
                                                        isMissed ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
                                                    }`}
                                                >
                                                    {isMissed ? (
                                                        <PhoneOff size={20} />
                                                    ) : isOutgoing ? (
                                                        <PhoneForwarded size={20} />
                                                    ) : (
                                                        <PhoneIncoming size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className={`font-medium ${isMissed ? 'text-red-500' : 'text-white group-hover:text-black'}`}>
                                                        {isMissed ? 'Missed call' : isOutgoing ? 'Outgoing call' : 'Incoming call'}{' '}
                                                        {duration && <span className='text-sm text-gray-500'>{duration}</span>}
                                                    </p>
                                                    <p className='flex flex-col text-sm text-gray-500'>{formatCallTime(call.startedAt)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                )}
            </Card>

            <div className='absolute bottom-4 left-0 w-full px-4'>
                <Link to={`call`} className='w-full flex justify-center items-center'>
                    <Button className='w-full flex gap-2 items-center bg-blue-400 hover:bg-blue-600'>
                        <Phone size={18} />
                        Call {contact.name}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
