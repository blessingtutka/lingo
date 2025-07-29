import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { restPassowordRequestSchema } from '@/lib/validators';
import type { resetPasswordRequestValue } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { requestPasswordReset } from '@/services/auth.service';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PasswordResetRequest() {
    const form = useForm<resetPasswordRequestValue>({
        resolver: zodResolver(restPassowordRequestSchema),
    });

    async function onSubmit(data: resetPasswordRequestValue) {
        try {
            await requestPasswordReset(data.email);
            toast.success('Password reset email send successfully');
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
                <h2 className='text-xl font-bold mb-6 text-foreground'>Passwort Reset Request</h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='john@example.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-end'>
                        <Button type='submit'>Request Password Reset</Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
