import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LoginForm } from './Login';
import { SignupForm } from './Signup';

export function AuthTabs() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const [tab, setTab] = useState('login');

    useEffect(() => {
        const queryTab = searchParams.get('tab');
        if (queryTab === 'signup' || queryTab === 'login') {
            setTab(queryTab);
        }
    }, [searchParams]);

    const handleLoginSubmit = async (data: any) => {
        setIsLoading(true);
        console.log('Login data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    const handleSignupSubmit = async (data: any) => {
        setIsLoading(true);
        console.log('Signup data:', data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <Card className='w-full flex items-center justify-center max-w-md'>
            <Tabs value={tab} onValueChange={setTab} defaultValue='login' className='w-full'>
                <CardHeader className='pb-0'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='login'>Login</TabsTrigger>
                        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                    </TabsList>
                </CardHeader>
                <CardContent className='pt-6'>
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
