'use client'
import { useState } from 'react'
import { Button } from '_/components/ui/button'
import AddNewUserAddress from './AddAddress/AddAddress'
import { addressType } from '_/app/checkout/checkout.types'

export default function AddAddress() {

    const [addresses, setAddresses] = useState<null | string>(() => localStorage.getItem('addresses'))
    const [selectedAddressID, setSelectedAddressID] = useState('')
    const [defaultAddress, setDefaultAddress] = useState<string | null>(() => localStorage.getItem('defaultAddress'))

    let addressesArr: addressType[] = []
    if (addresses !== null) {
        addressesArr = JSON.parse(addresses)
    }

    let addressWithID: addressType = { city: '', details: '', phone: '' }

    if (defaultAddress) {
        addressWithID = JSON.parse(defaultAddress)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedAddressID(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault()

        const selectedAddress: addressType = addressesArr.find((address: addressType) => address.id === selectedAddressID)!

        localStorage.setItem('defaultAddress', JSON.stringify(selectedAddress))

        setDefaultAddress(JSON.stringify(selectedAddress))
    }

    return (
        <>

            <h1 className='font-bold text-foreground text-xl mb-5' >
                Addresses
            </h1>

            <main className='  rounded-xl  border-border shadow-xl p-3 mb-5 '>
                <section className=" mb-5 " >
                    <header className='px-5 border-b-1 border-b-border flex justify-between '>
                        <span className="font-semibold text-foreground/90 text-lg" >Deliver to this address</span>
                    </header>

                    {defaultAddress && (
                        <div className="flex items-center bg-secondary/30 text-secondary-foreground/90  px-2 mt-2 rounded-lg">
                            <i className="fa-solid fa-location-dot fa-bounce fa-xl block"></i>
                            <div className="inline-block ms-2 my-3 " >
                                <p> {addressWithID?.city} </p>
                                <p> {addressWithID?.details} </p>
                                <p> {addressWithID?.phone} </p>
                            </div>
                        </div>
                    )}

                </section>

                {addresses && (
                    <>
                        <h2 className=' text-foreground/90 font-semibold text-lg border-b-1 border-b-border pb-1 ps-3 ' >
                            Shipping Addresses
                        </h2>
                        <form className='mb-3 px-1' onSubmit={handleSubmit}>
                            {addressesArr.map((address, index) =>
                                <div key={index} className='flex items-center  bg-secondary/30 text-secondary-foreground/90 my-3 px-3 py-2 rounded-xl  border-2 border-border has-checked:border-primary has-checked:accent-accent ' >
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
                                className='bg-primary text-white font-bold hover:bg-primary rounded-full     cursor-pointer  transition-all duration-300 '
                                type="submit"
                            >
                                Select Address
                            </Button>
                        </form>
                    </>
                )}

                <AddNewUserAddress setAddresses={setAddresses} setDefaultAddress={setDefaultAddress} />

            </main>
        </>
    )
}