'use client'
import { Button } from '_/components/ui/button'
import { Input } from '_/components/ui/input'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '_/components/ui/spinner'
import { resetPassword } from '../actions/forgot-password.actions'
import { Label } from '_/components/ui/label'

export default function ForgotPassword() {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const emailInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    async function handleSendingResetCode() {

        if (emailInput.current?.value && passwordInput.current?.value) {
            setIsLoading(true)
            const data = {
                email: (emailInput.current.value).trim(),
                newPassword: (passwordInput.current.value).trim()
            }
            const payload = await resetPassword(data)

            if (payload.statusMsg === 'fail') {
                toast.error(`${payload.message}`)
            } else {
                toast.success(`password has changed successfully, please sign in to proceed`)
                route.push('/signin')
            }
            setIsLoading(false)
        }
    }

    return (
        <>

            <main className=' mt-[100px] p-5 ' >
                <section className=' w-full lg:w-[600px]  mx-auto shadow-xl border-border  p-5 rounded-2xl ' >
                    <p className='text-foreground font-semibold text-xl border-b-1 border-b-neutral-200 pb-5 ' >
                        Reset Password
                    </p>

                    <p className='text-foreground my-5' >
                        Please enter your email address  to send code to your email
                    </p>

                    <div className='mb-5' >
                        <Label htmlFor="email">Email</Label>

                        <Input
                            ref={emailInput}
                            placeholder='Email Address'
                            type='email'
                            autoComplete='email'
                            id='email'
                            className='rounded-full'
                        />
                    </div>

                    <div className="mb-5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            ref={passwordInput}
                            type="password"
                            id="password"
                            placeholder="Password"
                            autoComplete='password'
                            className='rounded-full'
                        />
                    </div>

                    {isLoading ?
                        <Button size="sm" variant="outline" disabled  className='rounded-full w-full ' >
                            <Spinner />
                            Sending Code
                        </Button>
                        :
                        <Button
                            className=' bg-primary/90 hover:bg-primary font-bold px-6 w-full transition-colors duration-300 cursor-pointer rounded-full'
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
