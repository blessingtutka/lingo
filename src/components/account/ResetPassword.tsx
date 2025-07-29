import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/lib/validators';
import type { ChangePasswordFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/global';
import { resetPassword } from '@/services/auth.service';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export function ResetPassword() {
    const { token } = useParams();
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    async function onSubmit(data: ChangePasswordFormValues) {
        if (!token) {
            toast.error('Reset token is missing from the URL.');
            return;
        }
        try {
            await resetPassword(token, data.newPassword);
            toast.success('Password rest successfully');
            form.reset();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <div className='flex justify-between'>
                <Link to='/auth'>
                    <ArrowLeft className='h-5 w-5' />
                </Link>
                <h2 className='text-xl font-bold mb-6 text-foreground'>Rest Passwort</h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='newPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-end'>
                        <Button type='submit'>Rest Password</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
