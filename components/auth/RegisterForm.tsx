'use client'

import { useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/schemas';
import { Form, FormItem, FormLabel, FormMessage, FormField } from '@/components/ui/form'

import CardWrapper from "./CardWrapper"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { register } from '@/actions/register';

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>(({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    }))

    const handleSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values).then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
        })
    }

    return (
        <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account" backButtonHref="/auth/login" showSocial>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className='space-y-4'>
                        <FormField control={form.control} name='name' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Name
                                </FormLabel>
                                <Input type='text' placeholder='Sabbir Ahmed' disabled={isPending} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='email' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <Input type='email' placeholder='sabbir@gmail.com' disabled={isPending} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='password' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <Input type='password' placeholder='Enter your password' disabled={isPending} {...field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button type='submit' className='w-full' disabled={isPending}>
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm