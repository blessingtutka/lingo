import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { profileFormSchema } from '@/lib/validators';
import type { ProfileFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUser } from '@/providers/user.provider';
import { updateProfile } from '@/services/auth.service';

export function ProfileSection() {
    const { user } = useUser();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
            bio: '',
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        try {
            await updateProfile({ name: data.name, email: data.email });
            toast.success('Profile updated successfully');
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-bold text-foreground'>Profile Information</h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='flex flex-col sm:flex-row gap-6'>
                        <div className='flex-shrink-0'>
                            <div className='relative w-32 h-32'>
                                <img
                                    src='https://ui-avatars.com/api/?name=User'
                                    alt='Profile'
                                    className='w-full h-full rounded-full object-cover border-2 border-border'
                                />
                            </div>
                        </div>

                        <div className='flex-1 space-y-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='John Doe' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <Button variant='outline' type='reset'>
                            Cancel
                        </Button>
                        <Button type='submit' className='main-btn'>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
