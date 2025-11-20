'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "_/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "_/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "_/components/ui/field"
import { Input } from "_/components/ui/input"
import { changePasswordSchema } from "_/schema/changePassword.schema"
import { Controller, useForm } from "react-hook-form"
import * as zod from 'zod'
import { handleChangePassword } from "../actions/settings.actions"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

export const loginFormSchema = zod.object({
    email: zod.email('invalid-email').min(1, 'must enter an email'),
    password: zod.string().min(6, 'must at least enter 6 chars').max(9, 'max is 9 chars'),
})

export type changePasswordDataType = zod.infer<typeof changePasswordSchema>


export function ChangePassword() {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            currentPassword: '',
            password: '',
            rePassword: '',
        },
        resolver: zodResolver(changePasswordSchema)
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const {update} = useSession()

    async function customHandleSubmit(data: changePasswordDataType) {

        setIsLoading(true)

        const result = await handleChangePassword(data)

        if (result.message && result.token) {

            await update({ token: result.token })

            setIsOpen(false)
            
            toast.success("Password changed successfully!");


        } else {
            toast.error(result.message || "Failed to change password");
        }

        setIsLoading(false)

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >

            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer"
                >
                    Change Password
                </Button>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(customHandleSubmit)} >

                    <FieldGroup className='mb-2' >
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="currentPassword">
                                        Password :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="currentPassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Current Password"
                                        autoComplete="current-password"
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
                            name="password"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        New password :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="New Password"
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

                    <FieldGroup className='' >
                        <Controller
                            name="rePassword"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="rePassword">
                                        New password repeat :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="rePassword"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="repeat Password"
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

                    <div className='mt-5' >
                        <DialogClose asChild>
                            <Button className='cursor-pointer me-5' variant="outline">Cancel</Button>
                        </DialogClose>

                        {isLoading ?

                            <Button
                                className={` bg-blue-400   cursor-not-allowed `}
                            >
                                Loading...
                            </Button>
                            :
                            <Button
                                type="submit"
                                className={` bg-blue-400  hover:bg-blue-500 transition-colors duration-300 cursor-pointer  `}
                            >
                                Save changes
                            </Button>
                        }
                    </div>
                </form>


            </DialogContent>
        </Dialog>
    )
}
