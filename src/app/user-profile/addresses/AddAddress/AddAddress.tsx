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
        setIsLoading(false)
    }

    return (
        <>

            <Dialog open={isOpen} onOpenChange={setIsOpen} >

                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="text-sm text-secondary-foreground bg-secondary hover:underline cursor-pointer  rounded-full font-semibold px-5 w-max max-w-fit block mx-auto border-none hover:bg-secondary hover:text-secondary-foreground  "
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
                                    <FieldLabel htmlFor="city" className="text-foreground">
                                        City :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="city"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="city"
                                        autoComplete="city"
                                        className='border-border rounded-full '
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
                                <Field data-invalid={fieldState.invalid} className="my-2" >
                                    <FieldLabel htmlFor="details" className="text-foreground">
                                        Details :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="details"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="details"
                                        autoComplete="details"
                                        className='border-border rounded-full '
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
                                    <FieldLabel htmlFor="phone" className="text-foreground">
                                        Phone :
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="phone"
                                        autoComplete="phone"
                                        className='border-border rounded-full '
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
                                className='bg-primary/90  my-3 font-semibold text-primary-foreground px-6 py-2.5 rounded-full cursor-not-allowed'
                                disabled
                            >
                                Loading...
                            </button>
                            :
                            <button
                                type='submit'
                                className='bg-primary my-3 font-semibold rounded-full  py-1.5 px-4 text-primary-foreground  cursor-pointer'>
                                Deliver to this  Address
                            </button>
                        }
                    </form>


                </DialogContent>

            </Dialog>
        </>
    );
}
