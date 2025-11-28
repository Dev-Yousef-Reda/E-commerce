import React from 'react'
import { ChangePassword } from './ChangePassword/ChangePassword'

export default function page() {
    return (
        <>
            <h1 className='text-foreground font-bold text-xl mb-5' >Settings</h1>

            <section className='p-5 rounded-xl border-border shadow-xl ' >

                <div>
                    <p className='text-foreground text-lg mb-5  ' > 
                        Password
                    </p>

                    <ChangePassword />
                </div>

            </section>
        </>
    )
}
