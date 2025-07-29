import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '@/services/auth.service';
import { toast } from 'sonner';

export function EmailVerifed() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            toast.error('Missing verification token.');
            setLoading(false);
            return;
        }

        verifyEmail(token)
            .then(() => {
                toast.success('Email verified successfully!');
                setTimeout(() => navigate('/auth'), 3000);
            })
            .catch((err) => {
                toast.error(err.message || 'Email verification failed.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <h2 className='text-2xl font-semibold mb-2'>{loading ? 'Verifying your email...' : 'Verification result'}</h2>
            {!loading && <p>Please check the notification for status.</p>}
        </div>
    );
}
