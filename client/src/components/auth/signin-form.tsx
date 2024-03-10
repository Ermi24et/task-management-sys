'use client';

import {Button} from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {useState} from "react";
import {useAuth} from "@/hooks/auth";
import {Login} from "@/lib/types/Auth";
import {Checkbox} from "@/components/ui/checkbox";
import Link from "next/link";
import {useToast} from "@/components/ui/use-toast";


const formSchema = z.object({
    email: z.string().min(2, {
        message: 'Must be a valid email.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
    remember: z.boolean().default(false).optional(),
});


export default function SignIn() {

    const {login} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const {toast} = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await login({
                setErrors: setErrors,
                setStatus: setStatus,
                ...values,
            } as Login);
        } catch (error) {
            toast({
                variant: "default",
                title: "Something went wrong.",
                description: "Password or email is incorrect.",
                duration: 1500
            })
            form.setError('password', {
                type: 'manual',
                message: 'Password or email is incorrect.',
            })
        }
    }

    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem style={{margin: 0}}>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your email address.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your password.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <div className='flex gap-2 items-center mb-2'>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <FormLabel>Remember me</FormLabel>

                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit"
                                style={{boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset',}}>
                            Sign In
                        </Button>
                    </form>
                </Form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Button asChild variant='link'>
                        <Link href={'/register'}>Register here</Link>
                    </Button>
                </p>
            </div>
        </div>
    );
}