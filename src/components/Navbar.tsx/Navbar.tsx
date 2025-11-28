'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
import userPhoto from './../../assets/vecteezy_user-icon-on-transparent-background_19879186.png'
import Image from 'next/image'
import { cartItemsCountContext } from '_/context/ProductsCount/ProductsCountProvider'
import { getLoggedUserCartDetails } from '_/app/_services/cart.services'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NavigationMenuDemo } from './NavigationMenuDemo/NavigationMenuDemo'
import { NavbarSheet } from './NavbarSheet/NavbarSheet'
import { getAllCategories } from '_/app/_services/categories.services'
import { getAllProducts } from '_/app/_services/products.services'
import { categoryType } from '_/types/category.types'
import { productType } from '_/types/product.type'
import { ProfileSheet } from './ProfileSheet/ProfileSheet'



async function fetchAllCategories() {
    const payload = await getAllCategories()
    return payload
}

async function getProducts1() {
    const products = await getAllProducts(1)
    return products?.data
}

async function getProducts2() {
    const products = await getAllProducts(2)
    return products?.data
}

export default function Navbar({ showMegaMenu = true }: { showMegaMenu?: boolean }) {

    const [isTransparent, setIsTransparent] = useState<boolean>(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const pathName = usePathname()
    const userSession = useSession()
    const { cartItemsCount, updateCartItemsCount } = useContext(cartItemsCountContext)
    const [categories, setCategories] = React.useState<null | categoryType[]>(null)
    const [products1, setProducts1] = React.useState<undefined | productType[]>([])
    const [products2, setProducts2] = React.useState<undefined | productType[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const search = useRef<HTMLInputElement | null>(null)

    const route = useRouter()
    function clearSearchInput() {
        if (search.current && search.current.value) {
            route.push(`/search?name=${search.current.value}`)
            search.current.value = ''
        }
    }

    useEffect(() => {

        function handleNavColors() {
            setIsTransparent(false)
            const y = window.scrollY
            if (userSession.status === 'unauthenticated' || userSession.status === 'loading') {
                if (pathName === '/') {
                    if (y === 0) {
                        setIsTransparent(true)
                    } else if (y > 0) {
                        setIsTransparent(false)
                    }
                }
            }
        }
        handleNavColors()
        window.addEventListener('scroll', handleNavColors, { passive: true })

        if (userSession.status === 'authenticated') {
            getLoggedUserCartDetails().then((result) => {
                if (result?.status === 'success') {
                    updateCartItemsCount(result.numOfCartItems)
                }
            })
        }

        fetchAllCategories()
            .then((response) => { setCategories(response) })
            .finally(() => { setIsLoading(false) })

        Promise.all([getProducts1(), getProducts2()])
            .then(([page1, page2]) => {
                setProducts1(page1 || [])
                setProducts2(page2 || [])
            })


        return () => window.removeEventListener('scroll', handleNavColors)
    }, [pathName, updateCartItemsCount, userSession.status])

    return (
        <>
            <nav
                className={` fixed w-full top-0 z-50  border-b-1 border-b-white-100/50 text-base `}
            >
                <div className={`${isTransparent ? 'bg-transparent ' : 'bg-secondary/85  backdrop-blur-sm'} backdrop-blur-md   text-secondary-foreground  py-4`}
                >
                    <div className={` w-[90%] max-w-[90%] mx-auto flex  items-center sm:gap-4    ${showMegaMenu ? '  justify-between flex-wrap ' : ' xl:w-[80%] '}`} >

                        <div className='logo flex items-center gap-1 me-1.5 sm:me-0 sm:gap-4 w-[10%] min-w-max ' >
                            {showMegaMenu &&
                                <NavbarSheet products={[...products1!, ...products2!]} categories={categories} isLoading={isLoading} />
                            }
                            {!showMegaMenu &&
                                <ProfileSheet />
                            }

                            <div className="logo  w-max font-bold text-xl md:text-3xl ">
                                <Link href={`/`} className='w-max block ' >
                                    <div className=' w-[150px] md:w-[200px] ' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 200" role="img" className='  '  >
                                            <g fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M60 150 L115 40 L170 150" stroke='#A54040' />
                                                <path d="M85 105 L145 105" stroke='#A54040' />

                                                <path d="M200 80 L250 80 L280 130 L430 130" />
                                                <path d="M260 80 L290 130" />

                                                <circle cx="280" cy="150" r="14" fill="currentColor" stroke="none" />
                                                <circle cx="430" cy="150" r="14" fill="currentColor" stroke="none" />
                                            </g>
                                            <text x="290" y="100" font-family="Montserrat, Arial, sans-serif"
                                                font-size="50" font-weight="700" fill="#A54040">
                                                ApexMarket
                                            </text>
                                        </svg>
                                    </div>
                                </Link>
                            </div >

                        </div>

                        <div className={`search  ${showMegaMenu ? ' order-3 sm:order-0 mt-2 sm:mt-0 w-[70%] mx-auto sm:mx-0 sm:w-[50%] sm:max-w-[50%] relative ' : '  w-[80%]  flex justify-center '} `}>
                            <div className={` ${showMegaMenu ? '' : ' relative w-[70%] md:w-2/3 lg:w-1/2 '} `} >
                                <Input
                                    type="text"
                                    placeholder="What are you looking for? "
                                    className={`px-5 py-7 rounded-full  placeholder:text-secondary-foreground/50 text-xs md:font-semibold `}
                                    ref={search}
                                />
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className='absolute top-1/2 right-[8px] -translate-y-1/2 rounded-full size-12 cursor-pointer bg-secondary '
                                    onClick={clearSearchInput}
                                >
                                    <i
                                        className="fa-solid fa-magnifying-glass text-secondary-foreground font-bold text-lg  "
                                    ></i>
                                </Button>
                            </div>
                        </div>

                        {showMegaMenu &&
                            <div className="authentication icon flex justify-between items-center gap-[1%] sm:w-[10%]  font-bold">
                                {userSession.status === 'unauthenticated' && (
                                    <div className={` w-full md:text-base text-secondary-foreground`} >
                                        <Link className=' w-max  text-sm text-center  md:text-lg block bg-primary/80 text-primary-foreground px-3.5 py-2 rounded-full' href="/signin">
                                            Sign In
                                        </Link>
                                    </div>
                                )}
                                {userSession.status === 'authenticated' && (
                                    <>
                                        <div className=' hidden md:block  w-[55px]  relative  ' >
                                            <div className='user-image h-full cursor-pointer ' >
                                                <Image
                                                    className='w-full h-full object-contain '
                                                    src={userPhoto}
                                                    alt='logged user photo'
                                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                                />
                                            </div>
                                            {showUserMenu && (
                                                <div
                                                    className='bg-secondary  backdrop-blur-xl text-secondary-foreground w-[250px] absolute top-[65px] left-1/2 -translate-x-1/2 px-3 py-2  rounded-xl z-[100] '
                                                >
                                                    <div className='text-center pb-2 border-b-1 border-b-border ' >
                                                        <p>{userSession.data.user?.name}</p>
                                                        <p>{userSession.data.user?.email}</p>
                                                    </div>
                                                    <div className='py-2 my-2 hover:bg-accent hover:text-accent-foreground px-3 rounded-sm ' >
                                                        <Link className='w-full  cursor-pointer block' href={'/user-profile'} > Profile </Link>
                                                    </div>
                                                    <div className='py-2 my-2 hover:bg-accent hover:text-accent-foreground px-3 rounded-sm ' >
                                                        <Link className='w-full  cursor-pointer block' href={'/allorders'} > Orders </Link>
                                                    </div>
                                                    <div className='py-2 my-2 hover:bg-accent hover:text-accent-foreground px-3 rounded-sm ' >
                                                        <Link className='w-full  cursor-pointer block' href={'/wishlist'} > Wishlist </Link>
                                                    </div>
                                                    <button
                                                        className=' cursor-pointer my-2 hover:bg-accent hover:text-accent-foreground py-2 w-full text-left px-3 rounded-sm block'
                                                        onClick={() => signOut({ redirect: true, callbackUrl: '/signin' })}
                                                    >
                                                        Sign out
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className=' w-[49%]  cart ' >
                                            <Link
                                                href="/cart"
                                                className={`text-sm w-max md:text-base  text-secondary-foreground relative `}
                                            >
                                                <i className="fa-solid fa-cart-shopping fa-xl "></i>
                                                {cartItemsCount > 0 && (
                                                    <p className='absolute bg-accent text-accent-foreground -top-[70%]  -right-[15px] size-6 flex items-center justify-center  rounded-full' >
                                                        {cartItemsCount}
                                                    </p>
                                                )}
                                            </Link>
                                        </div>
                                    </>
                                )}

                            </div>
                        }

                    </div>
                </div>

                {showMegaMenu &&
                    <div className={`${isTransparent ? 'bg-transparent ' : 'bg-secondary/40  backdrop-blur-sm'}   border-border hidden md:block -z-[1] w-full py-4 relative `} >
                        <div className=' w-[90%] mx-auto  ' >
                            <NavigationMenuDemo products={[...products1!, ...products2!]} categories={categories} />
                        </div>
                    </div>
                }

            </nav>
        </>
    )
}
