import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Mail, Lock, LogIn, Loader2, Github, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { loginSchema, type LoginFormData } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input placeholder='email@example.com' {...field} />
                                    <Mail className='absolute right-3 top-3 h-4 w-4 text-muted-foreground' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <div className='flex justify-between items-center'>
                                <FormLabel>Password</FormLabel>
                                <Button variant='link' size='sm' className='text-primary px-0'>
                                    Forgot password?
                                </Button>
                            </div>
                            <FormControl>
                                <div className='relative'>
                                    <Input type='password' placeholder='••••••••' {...field} />
                                    <Lock className='absolute right-3 top-3 h-4 w-4 text-muted-foreground' />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='remember'
                    render={({ field }) => (
                        <FormItem className='flex items-center space-x-2'>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className='!mt-0'>Remember me</FormLabel>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full main-btn' disabled={isLoading}>
                    {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <LogIn className='mr-2 h-4 w-4' />}
                    Login
                </Button>

                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <Separator />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background px-2 text-muted-foreground'>OR CONTINUE WITH</span>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <Button variant='outline' type='button' disabled={isLoading}>
                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Gamepad className='mr-2 h-4 w-4' />}
                        Google
                    </Button>
                    <Button variant='outline' type='button' disabled={isLoading}>
                        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <Github className='mr-2 h-4 w-4' />}
                        GitHub
                    </Button>
                </div>
            </form>
        </Form>
    );
}
