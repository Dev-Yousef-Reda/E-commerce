import React from 'react'
import { ChangePassword } from './ChangePassword/ChangePassword'

export default function page() {
    return (
        <>
            <h1 className='text-slate-600 font-bold text-xl mb-5' >Settings</h1>

            <section className='p-5 rounded-2xl bg-white' >

                <div>
                    <p className='text-slate-500 text-lg mb-5 ' > 
                        Password
                    </p>

                    <ChangePassword />
                </div>

            </section>
        </>
    )
}
