import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { notificationsFormSchema } from '@/lib/validators';
import type { NotificationsFormValues } from '@/lib/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

export function NotificationsSection() {
    const form = useForm<NotificationsFormValues>({
        resolver: zodResolver(notificationsFormSchema),
        defaultValues: {
            emailMessages: true,
            emailComments: true,
            emailMentions: false,
            pushFollowers: true,
            pushLikes: false,
        },
    });

    function onSubmit(data: NotificationsFormValues) {
        console.log(data);
        // Handle form submission
    }

    return (
        <div className='bg-muted rounded-lg shadow p-6 mt-4 border border-border'>
            <h2 className='text-xl font-bold mb-6 text-foreground'>Notification Preferences</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='space-y-4'>
                        <h3 className='font-medium text-foreground'>Email Notifications</h3>

                        <FormField
                            control={form.control}
                            name='emailMessages'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>New Messages</FormLabel>
                                        <FormDescription className='text-muted-foreground'>
                                            Get notified when you receive new messages
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='emailComments'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>Comments</FormLabel>
                                        <FormDescription className='text-muted-foreground'>
                                            Get notified when someone comments on your posts
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='emailMentions'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>Mentions</FormLabel>
                                        <FormDescription className='text-muted-foreground'>Get notified when someone mentions you</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='space-y-4'>
                        <h3 className='font-medium text-foreground'>Push Notifications</h3>

                        <FormField
                            control={form.control}
                            name='pushFollowers'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>New Followers</FormLabel>
                                        <FormDescription className='text-muted-foreground'>Get notified when someone follows you</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='pushLikes'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                                    <div className='space-y-0.5'>
                                        <FormLabel>Likes</FormLabel>
                                        <FormDescription className='text-muted-foreground'>
                                            Get notified when someone likes your posts
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <Button type='submit' className='main-btn'>
                            Save Notification Settings
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
