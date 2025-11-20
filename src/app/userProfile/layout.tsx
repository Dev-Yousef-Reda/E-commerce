import ".././globals.css";
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import Navbar from "_/components/Navbar.tsx/Navbar";
import userImage from './../../assets/vecteezy_user-icon-on-transparent-background_19879186.png'
import Image from "next/image";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Signout from "_/components/Signout/Signout";

export const metadata = {
    title: 'Profile'
}


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const userSession = await getServerSession()

    return (
        <>
            <Navbar showMegaMenu={false} />
            <main className=" mt-[120px] w-[90%]  xl:w-[80%] mx-auto flex gap-8  ">
                <aside className=' hidden lg:block w-[310px]  '
                >

                    <section
                        className=' flex gap-3 items-center p-3 rounded-xl bg-white mb-3 '
                    >
                        <div
                            className=' w-[62px] h-[62px] rounded-full  relative  '
                        >
                            <Image
                                src={userImage}
                                alt="user profile"
                                className="w-full absolute top-1/2 left-1/2 -translate-1/2 scale-165 "
                            />
                        </div>

                        <div className="text-slate-600 font-bold text-lg  " >
                            <p> Hey {(userSession?.user.name)?.split(' ', 1)} ! </p>
                            <p className='font-semibold text-sm text-slate-400 mt-1' > {userSession?.user.email} </p>
                        </div>

                    </section>

                    <section
                        className=' items-center p-3 rounded-xl bg-white mb-3 '
                    >

                        <Link
                            href={'/allorders'}
                            className="text-slate-600 text-lg font-semibold p-3 mb-3
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
                            href={'/userProfile/addresses'}
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
                            href={'/userProfile/settings'}
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

                </aside>
                
                <section className="grow  "
                >
                    {children}
                </section>
            </main>
        </>
    );
}
