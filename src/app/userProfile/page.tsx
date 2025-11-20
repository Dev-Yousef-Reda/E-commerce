'use client'
import { useSession } from 'next-auth/react'
import React, { useRef } from 'react'
import { Label } from '_/components/ui/label'
import { Input } from '_/components/ui/input'

export default function UserProfile() {
    const userPhoneInput = useRef<HTMLInputElement>(null)
    const userSession = useSession()

    const userEmail = userSession.data?.user.email;
    const userPhone = localStorage.getItem('phone')?.slice(1, -1);

    const firstName = (userSession.data?.user.name)?.split(' ', 1)
    const lastName = (userSession.data?.user.name)?.split(' ').slice(1, )

    

    return (
        <>
            <h1 className=' text-slate-600 text-2xl font-bold ' > Profile </h1>
            <p className=' font-semibold text-lg text-slate-500 ' >View & Update Your Personal and Contact Information</p>
            <main
                className=' mt-[20px] '
            >

                <section className='p-5 bg-white rounded-2xl mb-5' >
                    <h2 className=' text-slate-600 text-xl font-bold ' >
                        Contact Information
                    </h2>

                    <div className=' flex mt-5  flex-col lg:flex-row' >
                        <div className=" lg:w-1/3   pe-3 ">
                            <Label className='mb-3 block ps-1 ' htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                className='py-5 px-3 h-fit cursor-not-allowed '
                                value={userEmail}
                                disabled={true}
                                />
                        </div>

                        <div className=" lg:w-1/3   ">
                            <Label className='block mb-3 ps-1  mt-5 lg:mt-0 ' htmlFor="phone">Phone</Label>
                            <Input
                                type="tel"
                                id="phone"
                                placeholder="Phone"
                                className='py-5 px-3 h-fit '
                                value={userPhone || ''}
                                ref={userPhoneInput}
                            />
                        </div>
                    </div>
                </section>

                <section className='p-5 bg-white rounded-2xl mb-5' >
                    <h2 className=' text-slate-600 text-xl font-bold ' >
                        Personal Information
                    </h2>

                    <div className=' flex mt-5 flex-col lg:flex-row  ' >
                        <div className=" lg:w-1/3 pe-3 ">
                            <Label className='mb-3 block ps-1 ' htmlFor="email">First Name</Label>
                            <Input
                                type="email"
                                id="email"
                                className='py-5 px-3 h-fit'
                                value={firstName}
                                />
                        </div>

                        <div className=" lg:w-1/3  mt-5 lg:mt-0 ">
                            <Label className='block mb-3 ps-1 ' htmlFor="phone">Last Name</Label>
                            <Input
                                type="tel"
                                id="phone"
                                placeholder="Phone"
                                className='py-5 px-3 h-fit '
                                value={lastName}
                                ref={userPhoneInput}
                            />
                        </div>
                    </div>
                </section>

                <button
                    className=' bg-blue-400 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-blue-500 transition-all duration-300 cursor-pointer '
                >
                    Update Profile
                </button>
                
            </main>
        </>
    )
}
