import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/providers/user.provider';
import { useParams } from 'react-router-dom';
import { Navigate, Link } from 'react-router-dom';

export function ContactInfo() {
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

    if (!contact) {
        return <Navigate to='/user' replace />;
    }

    return (
        <Card className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>Contact Information</h2>

            <div className='flex flex-col sm:flex-row gap-6'>
                <div className='flex-shrink-0'>
                    <div className='relative w-32 h-32'>
                        <img
                            src={contact.avatar || 'https://ui-avatars.com/api/?name=' + contact.name}
                            alt={contact.name || contact.email}
                            className='w-full h-full rounded-full object-cover border-2 border-border'
                        />
                    </div>
                </div>

                <div className='flex-1 space-y-4'>
                    <div>
                        <p className='text-sm font-semibold text-muted-foreground'>Full Name</p>
                        <p className='text-base text-foreground'>{contact.name || '—'}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-muted-foreground'>Email</p>
                        <p className='text-base text-foreground'>{contact.email}</p>
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-muted-foreground'>Phone</p>
                        <p className='text-base text-foreground'>{contact.phone || '—'}</p>
                    </div>
                </div>
            </div>

            <Link to={`/user/contact/${contactId}/call`} className='w-full flex justify-center items-center'>
                <Button className='w-full flex gap-2 items-center'>
                    <Phone />
                    Call
                </Button>
            </Link>
        </Card>
    );
}
