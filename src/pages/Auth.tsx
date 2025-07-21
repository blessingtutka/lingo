import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LoginForm } from './Login';
import { SignupForm } from './Signup';
import { login, register } from '@/services/auth.service';
import { useUser } from '@/providers/user.provider';

export function AuthTabs() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState('login');
    const { setToken } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const queryTab = searchParams.get('tab');
        if (queryTab === 'signup' || queryTab === 'login') {
            setTab(queryTab);
        }
    }, [searchParams]);

    const handleLoginSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const { accessToken } = await login(data.email, data.password);
            setToken(accessToken);
            navigate('/user');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (data: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const { accessToken } = await register(data);
            setToken(accessToken);
            navigate('/user');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className='w-full flex items-center justify-center max-w-md'>
            <Tabs value={tab} onValueChange={setTab} className='w-full'>
                <CardHeader className='pb-0'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='login'>Login</TabsTrigger>
                        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className='pt-6'>
                    {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
                    <TabsContent value='login'>
                        <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />
                    </TabsContent>
                    <TabsContent value='signup'>
                        <SignupForm onSubmit={handleSignupSubmit} isLoading={isLoading} />
                    </TabsContent>
                </CardContent>
            </Tabs>
        </Card>
    );
}
