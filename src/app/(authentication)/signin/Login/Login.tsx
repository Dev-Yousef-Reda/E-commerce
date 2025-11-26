'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from '_/components/ui/field'
import { Input } from '_/components/ui/input'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as zod from "zod"
import { Button } from '_/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Spinner } from '_/components/ui/spinner'
import { toast } from 'sonner'
import { loginFormSchema } from '_/schema/login.schema'


type loginDataType = zod.infer<typeof loginFormSchema>

export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(loginFormSchema),
    })

    async function customHandleSubmit(data: loginDataType) {

        setIsLoading(true)
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        })
        if (result?.ok) {
            window.location.href = '/';

            const storedEmail = localStorage.getItem('email');

            if (storedEmail !=`"${ data.email}"`) {                
                
                localStorage.setItem('email', JSON.stringify(data.email))
                localStorage.removeItem('defaultAddress')
                localStorage.removeItem('addresses')
                localStorage.removeItem('phone')
            }

        } else {
            toast.error('in-correct email or password')
        }
        setIsLoading(false)
    }

    return (
        <>
            <form id="form-rhf-input" onSubmit={handleSubmit(customHandleSubmit)} className='selection:bg-blue-400' >

                <FieldGroup className='mb-2' >
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Email :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Email"
                                    autoComplete="email"
                                    className='border-border rounded-full'
                                    type='email'
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>

                <FieldGroup className='mb-2' >
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">
                                    Password :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    className='border-border rounded-full'
                                    type='password'
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>


                {isLoading ?
                    <Button
                        className=' rounded-full text-lg bg-primary/90 hover:bg-primary transition-colors duration-300 cursor-pointer text-white font-bold w-full mt-5 py-5 '
                        variant="outline"
                        disabled
                    >
                        <Spinner />
                        Loading...
                    </Button>
                    :
                    <Button
                        type='submit'
                        className=' rounded-full text-lg bg-primary/90 hover:bg-primary transition-colors duration-300 cursor-pointer text-white font-bold w-full mt-5 py-5 '
                    >
                        Sign in
                    </Button>
                }
            </form>
        </>
    )
}