'use client'
import { Button } from '_/components/ui/button'
import { Input } from '_/components/ui/input'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '_/components/ui/spinner'
import { handleSendingVerifyCode } from '../actions/forgot-password.actions'

export default function ForgotPassword() {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const codeInput = useRef<HTMLInputElement>(null)

    async function handleSendingResetCode() {

        if (codeInput.current?.value && codeInput.current.value != '') {
            setIsLoading(true)
            const payload = await handleSendingVerifyCode(codeInput.current?.value)

            if (payload.status === 'Success') {
                toast.success('code is entered successfully ', {
                    description: 'Enter new password'
                })
                route.push('/forgot-password/reset-password')
            } else {
                toast.error(`${payload.message}`)
            }
            setIsLoading(false)
        }
    }

    return (
        <>

            <main className=' mt-[100px] p-5 ' >
                <section className=' w-full lg:w-[600px]  mx-auto border-border shadow-xl  p-5 rounded-2xl ' >
                    <p className='text-foreground font-semibold text-xl border-b-1 border-b-neutral-200 pb-5 ' >
                        Verify code
                    </p>

                    <p className='text-foreground my-5' >
                        Please enter the code send code to your email
                    </p>

                    <div className='mb-5' >
                        <Input
                            ref={codeInput}
                            placeholder='code'
                            type='text'
                            className='rounded-full'
                        />
                    </div>

                    {isLoading ?
                        <Button size="sm" variant="outline" disabled className='w-full max-w-full rounded-full '  >
                            <Spinner />
                            Sending Code...
                        </Button>
                        :
                        <Button
                            className=' bg-primary/90 hover:bg-primary font-bold px-6 w-full max-w-full transition-colors duration-300 cursor-pointer rounded-full '
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
