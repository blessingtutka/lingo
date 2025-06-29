// src/components/auth/signup-form.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, UserPlus, Loader2, Github, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { signupSchema, type SignupFormData } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface SignupFormProps {
    onSubmit: (data: SignupFormData) => void;
    isLoading?: boolean;
}

export function SignupForm({ onSubmit, isLoading = false }: SignupFormProps) {
    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input placeholder='John Doe' {...field} />
                                    <User className='absolute right-3 top-3 h-4 w-4 text-muted-foreground' />
                                </div>
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <div className='relative'>
                                    <Input type='password' placeholder='••••••••' {...field} />
                                    <Lock className='absolute right-3 top-3 h-4 w-4 text-muted-foreground' />
                                </div>
                            </FormControl>
                            <FormMessage />
                            <p className='text-xs text-muted-foreground'>Must be at least 8 characters</p>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                    name='terms'
                    render={({ field }) => (
                        <FormItem className='flex items-start space-x-2'>
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel className='font-normal'>
                                    I agree to the{' '}
                                    <Button variant='link' className='p-0 h-auto'>
                                        Terms of Service
                                    </Button>{' '}
                                    and{' '}
                                    <Button variant='link' className='p-0 h-auto'>
                                        Privacy Policy
                                    </Button>
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type='submit' className='w-full main-btn' disabled={isLoading}>
                    {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : <UserPlus className='mr-2 h-4 w-4' />}
                    Create Account
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
