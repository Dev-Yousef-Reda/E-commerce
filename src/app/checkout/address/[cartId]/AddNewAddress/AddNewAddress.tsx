'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "_/components/ui/dialog"

import { Controller, useForm } from "react-hook-form";
import { addressType } from "../../../checkout.types";
import { useRouter } from "next/navigation";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { Field, FieldError, FieldLabel } from "_/components/ui/field";
import { useState } from "react";

export default function AddNewAddress({ cartId }: { cartId: string }) {

    const route = useRouter()

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
        const addressesRaw = localStorage.getItem('addresses')
        let addresses: addressType[] = []

        if (addressesRaw === null) {
            addresses = [idAdded]
        } else {
            addresses = JSON.parse(addressesRaw) as addressType[]
            addresses.push(idAdded)
        }
        localStorage.setItem('addresses', JSON.stringify(addresses))
        route.push(`/checkout/${cartId}`)
    }

    return (
        <>

            <Dialog>

                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="text-sm cursor-pointer text-secondary-foreground hover:text-secondary-foreground border-none bg-secondary  hover:bg-secondary  hover:underline rounded-full underline-offset-4 block mx-auto "
                    >
                        Add New Address
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">

                    <DialogHeader>
                        <DialogTitle className="text-center" >Set Default Address</DialogTitle>
                    </DialogHeader>

                    <form
                        className="text-center flex flex-col gap-1.5 "
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
                                    <FieldLabel htmlFor="phone">
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
                            <div className="text-center" >
                                <button
                                    type='submit'
                                    className='bg-primary  my-3 font-semibold px-2 py-2.5 rounded-full text-primary-foreground cursor-not-allowed'
                                    disabled
                                >
                                    Loading...
                                </button>
                            </div>
                            :
                            <div className="text-center  " >
                                <button
                                    type='submit'
                                    className='bg-primary text-sm  my-3 font-semibold px-2 py-2.5 rounded-full text-primary-foreground cursor-pointer'>
                                    Deliver to this  Address
                                </button>
                            </div>
                        }
                    </form>


                </DialogContent>

            </Dialog>
        </>
    );
}
