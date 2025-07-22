import { Mic, Video, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/providers/user.provider';
import { UserAvatar } from '@/components/global';
import { useParams, Navigate } from 'react-router-dom';

export default function Call() {
    const { user } = useUser();
    const { contactId } = useParams<{ contactId: string }>();
    const isConnected = true;
    const isVideoOn = false;
    const isMicOn = true;

    const placeholderContact = {
        id: 'placeholder-id',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        avatar: '',
    };

    const contact = user?.contacts?.find((c) => c.id === contactId) || placeholderContact;

    if (!contact) {
        return <Navigate to='/user' replace />;
    }

    return (
        <div className='flex flex-col h-[calc(100vh-120px)] bg-background text-foreground'>
            <div className='flex-1 relative bg-black min-h-0 overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center'>
                    <UserAvatar user={contact} className='h-20 w-20' />

                    {isVideoOn && (
                        <div className='absolute inset-0 bg-muted flex items-center justify-center'>
                            <span className='text-muted-foreground'>Remote video stream</span>
                        </div>
                    )}
                </div>

                {isVideoOn && (
                    <div className='absolute bottom-4 right-4 w-32 h-48 bg-gray-800 rounded-md overflow-hidden border border-muted'>
                        <div className='h-full flex items-center justify-center text-muted-foreground text-sm'>Your video</div>
                    </div>
                )}

                <div className='absolute top-4 left-4 bg-muted/80 backdrop-blur p-3 rounded-lg'>
                    <h2 className='font-medium'>{contact.name || contact.email}</h2>
                    <p className='text-sm text-muted-foreground'>{isConnected ? 'Connected' : 'Calling...'}</p>
                </div>
            </div>

            <div className='bg-muted/50 backdrop-blur py-4'>
                <div className='flex justify-center gap-4'>
                    <Button variant={isMicOn ? 'default' : 'secondary'} size='icon' className='rounded-full h-12 w-12'>
                        <Mic className='h-5 w-5' />
                    </Button>

                    <Button variant={isVideoOn ? 'default' : 'secondary'} size='icon' className='rounded-full h-12 w-12'>
                        <Video className='h-5 w-5' />
                    </Button>

                    <Button variant='destructive' size='icon' className='rounded-full h-12 w-12'>
                        <Phone className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
