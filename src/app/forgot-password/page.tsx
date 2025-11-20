'use client'
import { Button } from '_/components/ui/button'
import { Input } from '_/components/ui/input'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { handleForgetPassword } from './actions/forgot-password.actions'
import { toast } from 'sonner'
import { Spinner } from '_/components/ui/spinner'

export default function ForgotPassword() {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const emailInput = useRef<HTMLInputElement>(null)

    async function handleSendingResetCode() {

        if (emailInput.current?.value && emailInput.current.value != '') {
            setIsLoading(true)
            const payload = await handleForgetPassword(emailInput.current?.value)

            if (payload.statusMsg === 'success') {
                route.push('/forgot-password/verify')
                toast.success('Reset code is send to your email')
            } else {
                toast.error(`${payload.message}`)
            }
            setIsLoading(false)
        }
    }

    return (
        <>

            <main className='bg-neutral-100 mt-[100px] p-5 ' >
                <section className=' w-full lg:w-[600px]   mx-auto bg-white p-5 rounded-2xl ' >
                    <p className='text-slate-500 font-semibold text-xl border-b-1 border-b-neutral-200 pb-5 ' >
                        Reset Password
                    </p>

                    <p className='text-slate-400 my-5' >
                        Please enter your email address  to send code to your email
                    </p>

                    <div className='mb-5' >
                        <Input
                            ref={emailInput}
                            placeholder='Email Address'
                            type='email'
                            autoComplete='email'
                        />
                    </div>

                    {isLoading ?
                        <Button size="sm" variant="outline" disabled>
                            <Spinner />
                            Sending Code
                        </Button>
                        :
                        <Button
                            className=' bg-blue-400 hover:bg-blue-500 transition-colors duration-300 cursor-pointer '
                            onClick={handleSendingResetCode}
                        >
                            Send Code
                        </Button>
                    }

                </section>
            </main>

        </>
    )
}
