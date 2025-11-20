'use client'
import { useState } from 'react'
import AddNewAddress from './AddNewAddress/AddNewAddress'
import { addressType } from '../../checkout.types'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '_/components/ui/button'

export default function AddAddress() {

    const params = useParams() 

    const cartId = params.cartId as string

    const [addresses] = useState<null | string>(() => localStorage.getItem('addresses'))
    const [selectedAddressID, setSelectedAddressID] = useState('')
    const route = useRouter()
    let addressesArr: addressType[] = []
    if (addresses !== null) {
        addressesArr = JSON.parse(addresses)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedAddressID(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        const selectedAddress: addressType = addressesArr.find((address: addressType) => address.id === selectedAddressID)!

        localStorage.setItem('defaultAddress', JSON.stringify(selectedAddress))
        route.push(`/checkout/${cartId}`)
    }

    return (

        <main className=' w-1/2 mx-auto  mt-[100px] md:mt-[210px] bg-white rounded-xl p-3 '>

            {addresses && (
                <form className='mb-3 px-1' onSubmit={handleSubmit}>
                    {addressesArr.map((address, index) =>
                        <div key={index} className='flex items-center bg-slate-100 my-3 px-3 py-2 rounded-lg  border-2 border-slate-300 has-checked:border-blue-400' >
                            <label htmlFor={`${address.id}`} className='ms-3 w-full cursor-pointer flex items-center '>
                                <input
                                    type="radio"
                                    name="address"
                                    id={`${address.id}`}
                                    className='peer'
                                    onChange={handleChange}
                                    value={address.id}
                                    checked={address.id === selectedAddressID}
                                />
                                <span className='ms-3'>
                                    <span className='block' > {address?.city} </span>
                                    <span className='block' > {address?.details} </span>
                                    <span className='block' > {address?.phone} </span>
                                </span>
                            </label>
                        </div>
                    )}
                    <Button
                        className='bg-blue-400 text-white font-bold hover:bg-blue-500 cursor-pointer  transition-all duration-300 ' 
                        type="submit"
                    >
                        Select Address
                    </Button>
                </form>
            )}

            <AddNewAddress cartId={cartId} />

        </main>

    )
}