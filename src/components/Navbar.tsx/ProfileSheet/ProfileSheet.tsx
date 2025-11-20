'use client'
import { Button } from "_/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "_/components/ui/sheet"
import Link from "next/link"
import Signout from "_/components/Signout/Signout"
import { useSession } from "next-auth/react"
import userImage from './../../../assets/vecteezy_user-icon-on-transparent-background_19879186.png'
import Image from "next/image"


export function ProfileSheet() {

    const userSession = useSession()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-transparent border-0 p-0 hover:bg-transparent me-1.5 cursor-pointer  lg:hidden flex items-center "
                >
                    <i className="fa-solid fa-bars text-xl w-full"></i>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" >
                <SheetHeader>
                    <section
                        className=' flex gap-3 items-center p-3 rounded-xl bg-white pb-0 '
                    >
                        <div
                            className=' w-[62px] h-[62px] rounded-full  relative  '
                        >
                            <Image
                                src={userImage}
                                alt="user profile"
                                className="w-full absolute top-1/2 left-1/2 -translate-1/2 scale-140 "
                            />
                        </div>

                        <div className="text-slate-600 font-bold text-lg  " >
                            <p> Hey {(userSession.data?.user.name)?.split(' ', 1)} ! </p>
                            <p className='font-semibold text-sm text-slate-400 mt-1' > {userSession?.data?.user.email} </p>
                        </div>

                    </section>
                </SheetHeader>

                <div className=' p-3 '
                >

                    <section
                        className=' items-center p-3 rounded-xl bg-white mb-3 '
                    >

                        <Link
                            href={'/allorders'}
                            className="text-slate-600 text-lg font-semibold p-3 mb-3 pt-0
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-solid fa-bag-shopping"></i>
                            </span>

                            <span   >
                                Orders
                            </span>
                        </Link>

                        <Link
                            href={'/cart'}
                            className="text-slate-600 text-lg font-semibold p-3 mb-3
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-solid fa-cart-plus"></i>
                            </span>

                            <span   >
                                Cart
                            </span>
                        </Link>

                        <Link
                            href={'/wishlist'}
                            className="text-slate-600 text-lg font-semibold p-3
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-regular fa-heart"></i>
                            </span>

                            <span   >
                                Wishlist
                            </span>
                        </Link>

                    </section>

                    <p className='text-slate-600 ps-3 mb-3 text-lg font-bold' >Account</p>

                    <section
                        className=' items-center p-3 rounded-xl bg-white mb-3 '
                    >

                        <Link
                            href={'/userProfile'}
                            className="text-slate-600 text-lg font-semibold p-3 mb-3
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-regular fa-circle-user"></i>
                            </span>

                            <span   >
                                Profile
                            </span>
                        </Link>

                        <Link
                            href={'/addresses'}
                            className="text-slate-600 text-lg font-semibold p-3 
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-solid fa-location-dot"></i>
                            </span>

                            <span   >
                                Addresses
                            </span>
                        </Link>

                    </section>

                    <p className='text-slate-600 ps-3 mb-3 text-lg font-bold' >Other</p>

                    <section
                        className=' items-center p-3 rounded-xl bg-white mb-3 '
                    >

                        <Link
                            href={'/addresses'}
                            className="text-slate-600 text-lg font-semibold p-3 
                            hover:bg-neutral-100 transition-colors duration-300 w-full block rounded-xl "
                        >
                            <span className="me-3" >
                                <i className="fa-solid fa-user-shield"></i>
                            </span>

                            <span   >
                                Security Settings
                            </span>
                        </Link>

                    </section>

                    <section
                        className=' items-center p-3 rounded-xl bg-white mb-3 '
                    >

                        <Signout />

                    </section>
                </div>

            </SheetContent>

        </Sheet>
    )
}
