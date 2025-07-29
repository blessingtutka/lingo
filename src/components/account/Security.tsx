import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { securityFormSchema } from '@/lib/validators';
import type { SecurityFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useUser } from '@/providers/user.provider';
import { toast } from 'sonner';
import { requestEmailVerification, updateSecurity } from '@/services/auth.service';

export function SecuritySection() {
    const { user } = useUser();
    const form = useForm<SecurityFormValues>({
        resolver: zodResolver(securityFormSchema),
        defaultValues: {
            enable2FA: false,
            loginAlerts: true,
        },
    });

    const onSubmit = async (data: SecurityFormValues) => {
        try {
            await updateSecurity(data);
            toast.success('security info updated successfully');
            form.reset();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const onVerifyEmail = async () => {
        try {
            await requestEmailVerification();
            toast.success('Verification email send successfully');
            form.reset();
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>Security Settings</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div>
                            <Label className='text-foreground'>Password</Label>
                            <p className='text-sm text-muted-foreground'>Last changed 3 months ago</p>
                        </div>
                        <Link to='/user/change-password'>
                            <Button variant='outline' type='button'>
                                Change Password
                            </Button>
                        </Link>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                        <div>
                            <Label className='text-foreground'>Email verification</Label>
                            <p className='text-sm text-muted-foreground'>
                                {user && user?.emailVerified ? 'Email not verified' : 'Please verify your Email'}
                            </p>
                        </div>
                        {!user?.emailVerified && (
                            <Button onClick={() => onVerifyEmail} variant='outline' type='button'>
                                Verify your email
                            </Button>
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name='enable2FA'
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                <div className='space-y-0.5'>
                                    <FormLabel className='text-base'>Two-Factor Authentication</FormLabel>
                                    <FormDescription className='text-muted-foreground'>Add an extra layer of security</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='loginAlerts'
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                <div className='space-y-0.5'>
                                    <FormLabel className='text-base'>Login Alerts</FormLabel>
                                    <FormDescription className='text-muted-foreground'>Email me about new logins</FormDescription>
                                </div>
                                <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-end'>
                        <Button type='submit' className='main-btn'>
                            Save Security Settings
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
