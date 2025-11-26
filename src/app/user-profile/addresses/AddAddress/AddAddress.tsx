'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "_/components/ui/dialog"

import { Controller, useForm } from "react-hook-form";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { Field, FieldError, FieldLabel } from "_/components/ui/field";
import { SetStateAction, useState } from "react";
import { addressType } from "_/app/checkout/checkout.types";

export default function AddNewAddress({ setAddresses, setDefaultAddress }:
    {
        setAddresses: React.Dispatch<SetStateAction<string | null>>,
        setDefaultAddress: React.Dispatch<SetStateAction<string | null>>,
    }) {

    const [isOpen, setIsOpen] = useState(false)

    const { control, handleSubmit, } = useForm({
        defaultValues: {
            "details": "",
            "phone": "",
            "city": ""
        }
    })
    const [isLoading, setIsLoading] = useState(false)

    function customHandleSubmit(data: addressType) {
        setIsLoading(true)
        const idAdded = { ...data, id: JSON.stringify(data) }

        localStorage.setItem('defaultAddress', JSON.stringify(idAdded))
        setDefaultAddress(JSON.stringify(idAdded))
        const addressesRaw = localStorage.getItem('addresses')
        let addresses: addressType[] = []

        if (addressesRaw === null) {
            addresses = [idAdded]
        } else {
            addresses = JSON.parse(addressesRaw) as addressType[]
            addresses.push(idAdded)
        }

        localStorage.setItem('addresses', JSON.stringify(addresses))
        setAddresses(JSON.stringify(addresses))
        setIsOpen(false)
    }

    return (
        <>

            <Dialog open={isOpen} onOpenChange={setIsOpen} >

                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="text-sm text-blue-400 hover:underline cursor-pointer bg-transparent border-none hover:text-blue-500 "
                    >
                        Add New Address
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle className="text-center" >Set Default Address</DialogTitle>
                    </DialogHeader>

                    <form
                        className="text-center"
                        onSubmit={handleSubmit(customHandleSubmit)} >

                        <Controller
                            name="city"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="city">
                                        City :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="city"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="city"
                                        autoComplete="city"
                                        className='border-slate-400 rounded-full '
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="details"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="details">
                                        Details :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="details"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="details"
                                        autoComplete="details"
                                        className='border-slate-400 rounded-full '
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
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
                                        placeholder="phone"
                                        autoComplete="phone"
                                        className='border-slate-400 rounded-full '
                                    />

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {isLoading ?
                            <button
                                type='submit'
                                className='bg-blue-400 my-3 font-bold px-2 py-2.5 rounded-lg text-white cursor-not-allowed'
                                disabled
                            >
                                Loading...
                            </button>
                            :
                            <button
                                type='submit'
                                className='bg-blue-400 my-3 font-bold px-2 py-2.5 rounded-lg text-white cursor-pointer'>
                                Deliver to this  Address
                            </button>
                        }
                    </form>


                </DialogContent>

            </Dialog>
        </>
    );
}
