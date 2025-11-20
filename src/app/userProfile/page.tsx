'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect,  useState } from 'react'
import { Input } from '_/components/ui/input'
import { Controller, useForm } from 'react-hook-form'
import * as zod from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from '_/components/ui/field'
import { updateUserDataSchema } from '_/schema/updateUserData.schema'
import { handleUpdateUserData } from './actions/userProfile.actions'
import { toast } from 'sonner'
import { Button } from '_/components/ui/button'
import { Spinner } from '_/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export type userData = zod.infer<typeof updateUserDataSchema>

export default function UserProfile() {
    const userSession = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const route = useRouter()
    const phone = localStorage.getItem('phone')

    const { handleSubmit, control, reset } = useForm<userData>({
        defaultValues: {
            name: '',
            email: '',
            phone: phone ?? ''
        },
        mode: 'onBlur',
        resolver: zodResolver(updateUserDataSchema)
    })


    useEffect(() => {

        if (userSession.status === 'authenticated' || userSession.data) {
            reset({
                name: userSession.data.user.name,
                email: userSession.data.user.email,
                phone: phone ?? ''
            })
        }

    }, [userSession.status, reset, phone, userSession.data])


    async function customHandleSubmit(data: userData) {
        setIsLoading(true)
        const result = await handleUpdateUserData({
            email: data.email,
            phone: data.phone,
            name: data.name,
        })
        console.log('update:', data);

        if (result.message == 'success') {
            toast.success("Data is updated successfully")
            route.refresh()

        } else {
            if (result?.errors?.msg) {

                toast.error(`${result.errors.msg}`)
            }
            toast.error(`error happened couldn't update data`)
        }
        setIsLoading(false)
    }

    return (
        <>
            <h1 className=' text-slate-600 text-2xl font-bold ' > Profile </h1>
            <p className=' font-semibold text-lg text-slate-500 ' >View & Update Your Personal and Contact Information</p>
            <main
                className=' mt-[20px] '
            >

                <form onSubmit={handleSubmit(customHandleSubmit)}>

                    <section className='p-5 bg-white rounded-2xl mb-5' >
                        <h2 className=' text-slate-600 text-xl font-bold ' >
                            Contact Information
                        </h2>

                        <div className=' flex mt-5  flex-col lg:flex-row' >
                            <div className=" lg:w-1/2 mb-3  pe-3 ">

                                <FieldGroup className='' >
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
                                                    className='border-slate-400 rounded-full w-full '
                                                    type='email'
                                                />

                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>

                            <div className=" lg:w-1/3   ">

                                <FieldGroup className='' >
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-input-username">
                                                    Phone :
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="phone"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Phone"
                                                    autoComplete="tel"
                                                    className='border-slate-400 rounded-full'
                                                    type='tel'
                                                />

                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>
                        </div>
                    </section>

                    <section className='p-5 bg-white rounded-2xl mb-5' >
                        <h2 className=' text-slate-600 text-xl font-bold ' >
                            Personal Information
                        </h2>

                        <div className=' flex mt-5 flex-col lg:flex-row  ' >
                            <div className=" lg:w-1/2 pe-3 ">

                                <FieldGroup className='mb-2' >
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-rhf-input-username">
                                                    Name :
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="name"
                                                    aria-invalid={fieldState.invalid}
                                                    placeholder="Name"
                                                    autoComplete="name"
                                                    className='border-slate-400 rounded-full'
                                                    type='text'
                                                />

                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </FieldGroup>
                            </div>

                        </div>
                    </section>
                    {isLoading ?
                        <Button
                            className='h-fit bg-blue-400 text-white font-bold text-lg px-8 py-3 rounded-full '
                            variant="outline"
                            disabled>
                            <Spinner />
                            Loading...
                        </Button>
                        :
                        <Button
                            className='h-fit bg-blue-400 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-500 transition-all duration-300 cursor-pointer '
                            type='submit'
                        >
                            Update Profile
                        </Button>
                    }

                </form>

            </main>
        </>
    )
}
