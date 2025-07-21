import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/lib/validators';
import type { ChangePasswordFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/global';
import { changePassword } from '@/services/auth.service';

export function ChangePasswordSection() {
    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
    });

    async function onSubmit(data: ChangePasswordFormValues) {
        try {
            await changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword });
            toast.success('Password changed successfully');
            form.reset();
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>Change Password</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='oldPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <PasswordInput {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        <Button type='submit'>Update Password</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
