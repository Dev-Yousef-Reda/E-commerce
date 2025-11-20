'use client'
import { Field, FieldError, FieldGroup, FieldLabel } from '_/components/ui/field'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '_/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from '_/schema/register.schema'
import { registerDataType } from '../types/signup.types'
import { handleRegister } from '../actions/signup.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '_/components/ui/spinner'
import { Input } from '_/components/ui/input'

export default function  Register() {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { handleSubmit, control } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(registerFormSchema),
    })

    async function customHandleSubmit(registerData: registerDataType) {

        setIsLoading(false)
        const result = await handleRegister(registerData)

        if (result === 'success') {
            toast.success("Your account is created successfully", {
                position: 'bottom-right',
                duration: 5000,
                description: 'please login to proceed',
            })

            localStorage.setItem('email', JSON.stringify(registerData.email))
            localStorage.setItem('phone', JSON.stringify(registerData.phone))

            route.push('/signin')
        } else {
            toast.error(`${result}`, {
                position: 'bottom-right',
                duration: 5000,
            })
        }
        setIsLoading(true)
    }

    return (
        <>
            <form id="form-rhf-input" onSubmit={handleSubmit(customHandleSubmit)} className='selection:bg-blue-400' >
                <FieldGroup className='mb-2'>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="name">
                                    Name :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Name"
                                    autoComplete="name"
                                    className='border-slate-400 rounded-full '
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
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-input-username">
                                    Email :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-input-username"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Email"
                                    autoComplete="email"
                                    className='border-slate-400 rounded-full'
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
                                    className='border-slate-400 rounded-full'
                                    type='password'
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
                        name="rePassword"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="rePassword">
                                    Password Conformation :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="rePassword"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Password Conformation"
                                    autoComplete="new-password"
                                    className='border-slate-400 rounded-full'
                                    type='password'
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
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="phone">
                                    Phone :
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="phone"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Phone"
                                    autoComplete="on"
                                    className='border-slate-400 rounded-full'
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
                        className=' rounded-full text-lg bg-blue-400 hover:bg-blue-500 transition-colors duration-300 cursor-pointer text-white font-bold w-full mt-5 py-5 '
                        variant="outline"
                        disabled
                    >
                        <Spinner />
                        Loading...
                    </Button>
                    :
                    <Button
                        type='submit'
                        className=' rounded-full text-lg bg-blue-400 hover:bg-blue-500 transition-colors duration-300 cursor-pointer text-white font-bold w-full mt-5 py-5 '
                    >
                        Register
                    </Button>
                }

            </form>
        </>
    )
}