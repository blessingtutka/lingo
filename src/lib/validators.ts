import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    remember: z.boolean().optional(),
});

export const signupSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        terms: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const profileFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email.',
    }),
    bio: z.string().optional(),
});

export const securityFormSchema = z.object({
    enable2FA: z.boolean(),
    loginAlerts: z.boolean(),
});

export const notificationsFormSchema = z.object({
    emailMessages: z.boolean(),
    emailComments: z.boolean(),
    emailMentions: z.boolean(),
    pushFollowers: z.boolean(),
    pushLikes: z.boolean(),
});

export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
export type SecurityFormValues = z.infer<typeof securityFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
