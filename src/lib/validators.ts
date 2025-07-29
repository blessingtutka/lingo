import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(5, 'Password must be at least 5 characters'),
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
    newContactAlert: z.boolean(),
    missedCallAlert: z.boolean(),
    summaryReport: z.boolean(),
});

export const changePasswordSchema = z
    .object({
        oldPassword: z.string().min(6),
        newPassword: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const restPassowordRequestSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export type resetPasswordRequestValue = z.infer<typeof restPassowordRequestSchema>;
export type resetPasswordValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
export type SecurityFormValues = z.infer<typeof securityFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
