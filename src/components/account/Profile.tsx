import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { profileFormSchema } from '@/lib/validators';
import type { ProfileFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';

export function ProfileSection() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            name: '',
            email: '',
            bio: '',
        },
    });

    function onSubmit(data: ProfileFormValues) {
        console.log(data);
        // Handle form submission
    }

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>Profile Information</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='flex flex-col sm:flex-row gap-6'>
                        <div className='flex-shrink-0'>
                            <div className='relative w-32 h-32'>
                                <img
                                    src='https://randomuser.me/api/portraits/women/44.jpg'
                                    alt='Profile'
                                    className='w-full h-full rounded-full object-cover border-2 border-border'
                                />
                                <Button
                                    variant='outline'
                                    size='icon'
                                    className='absolute bottom-0 right-0 rounded-full w-8 h-8 bg-background hover:bg-accent'
                                >
                                    <span className='sr-only'>Upload new photo</span>
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='16'
                                        height='16'
                                        viewBox='0 0 24 24'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        className='text-foreground'
                                    >
                                        <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-7' />
                                        <path d='M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z' />
                                    </svg>
                                </Button>
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
                                            <Input placeholder='Erwin Springer' {...field} />
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
                                            <Input placeholder='erwins9@gmail.com' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='bio'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Tell us a little bit about yourself' className='resize-none' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2'>
                        <Button variant='outline' type='button'>
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
