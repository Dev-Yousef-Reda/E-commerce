'use client'
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { addressType } from "../checkout.types";
import { usePathname, useRouter } from "next/navigation";
import { cartDetailsType } from "_/types/cart.types";
import { cartItemsCountContext } from "_/context/ProductsCount/ProductsCountProvider";
import { handleCardPayment, handleCashPayment } from "../checkout.actions";
import { toast } from "sonner";
import { getLoggedUserCartDetails } from "_/app/_services/cart.services";
import CartProductCard from "_/app/cart/CartProductCard/CartProductCard";

export default function Page() {

    const pathName = usePathname()
    const cartId = `${pathName.split('/')[2]}`;
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [cartDetailsState, setCartDetailsState] = useState<cartDetailsType | null>({
        numOfCartItems: 0,
        cartId: '',
        data: {
            products: [],
            totalCartPrice: 0,
        },
    })
    const [defaultAddress] = useState<string | null>(() => localStorage.getItem('defaultAddress'))

    const [paymentMethod, setPaymentMethod] = useState<string>('cash')
    const [isLoading, setIsLoading] = useState(false)

    const { updateCartItemsCount } = useContext(cartItemsCountContext)

    async function fetchCartDetails(): Promise<cartDetailsType | null> {
        const cartDetails = await getLoggedUserCartDetails();
        return cartDetails
    }
    const route = useRouter()

    useEffect(() => {
        setLoadingProducts(true)

        fetchCartDetails().then((res) => {
            setCartDetailsState(res)
        }).finally(() => {
            setLoadingProducts(false)
        })

    }, [])

    let addressWithID: addressType = { city: '', details: '', phone: '' }
    let address: addressType = { city: '', details: '', phone: '' }

    if (defaultAddress) {
        addressWithID = JSON.parse(defaultAddress)
        delete addressWithID.id
        address = addressWithID
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPaymentMethod(event.target.value)
    }

    async function handlePayment() {
        setIsLoading(true)
        if (paymentMethod === 'cash') {
            const result = await handleCashPayment(cartId, address)

            if (result) {
                updateCartItemsCount(0)
                toast.success('order is created', {
                    description: 'Your Order is created successfully',
                })
                route.push('/allorders')
            }
        }

        if (paymentMethod === 'card') {
            const result = await handleCardPayment(cartId, address)
            if (!!result) {
                window.location.href = result
            }
        }
        setIsLoading(false)
    }

    return (
        <main className=" mt-[210px] flex justify-between w-[70%]  mb-7 mx-auto">

            <section className="w-[70%] border-border shadow-xl p-3 rounded-xl ">
                <section className="  " >
                    <header className='px-5 pb-2 border-b-2 border-b-border  flex justify-between '>
                        <span className="font-bold text-foreground" >Shipping Address</span>
                        <Link href={`/checkout/address/${cartId}`}
                            className=" text-primary hover:underline cursor-pointer "
                        >change
                        </Link>
                    </header>

                    {defaultAddress && (
                        <div className="flex items-center border shadow-lg text-foreground  px-2 mt-4 rounded-lg">
                            <i className="fa-solid fa-location-dot fa-bounce fa-xl block"></i>
                            <div className="inline-block ms-2 my-3 " >
                                <p> {addressWithID?.city} </p>
                                <p> {addressWithID?.details} </p>
                                <p> {addressWithID?.phone} </p>
                            </div>
                        </div>
                    )}

                    {!defaultAddress && (<Link href={`/checkout/address/${cartId}`}
                        className="block text-sm text-primary hover:underline cursor-pointer mt-3.5">
                        Add an address
                    </Link>)}

                </section>

                <section className=" mt-13 ">
                    <header className='px-5 pb-2 border-b-2 border-b-border flex justify-between '>
                        <span className="font-bold text-foreground" >Your Order</span>
                    </header>

                    {loadingProducts ? 'Loading your order' : (
                        <div className='flex flex-col border-slate-400 my-2' >
                            {cartDetailsState?.data.products.map((item) =>
                                <CartProductCard product={item} key={item.product._id} />
                            )}
                        </div>
                    )}
                </section>

                <section className=" mt-13 ">
                    <header className='px-5 pb-2 border-b-2 border-b-border flex justify-between '>
                        <span className="font-bold text-foreground" >Payment</span>
                    </header>

                    <form className=" border-2 px-2 py-4 border-border mt-2.5 rounded-lg text-foreground" >
                        <div className="px-2 py-3 border-2 border-border has-checked:border-primary rounded-lg flex ">
                            <input
                                onChange={handleChange}
                                type="radio"
                                value={`cash`}
                                name="pay"
                                id="cash"
                                className="cursor-pointer "
                                checked={paymentMethod === 'cash'}
                            />
                            <label htmlFor="cash" className="cursor-pointer inline-block grow ps-2 ">
                                Cash on delivery
                            </label>
                        </div>

                        <div className="px-2 py-3 border-2 border-border has-checked:border-primary rounded-lg flex mt-3 ">
                            <input
                                onChange={handleChange}
                                type="radio"
                                value={`card`}
                                name="pay"
                                id="card"
                                className="cursor-pointer "
                                checked={paymentMethod === 'card'}
                            />
                            <label htmlFor="card" className="cursor-pointer inline-block grow ps-2 ">
                                Credit/Debit Card
                            </label>
                        </div>

                    </form>
                </section>
            </section>

            <section className=' w-[28%] shadow-xl border-border h-fit py-2 rounded-lg  sticky top-[100px]'>
                <div className=' p-2 text-center'>
                    <h2 className=' font-bold text-foreground border-b-1 border-border mb-3 '>Order Summary</h2>
                    <p>
                        <span className='font-bold ' > Total Price:  </span>
                        {cartDetailsState?.data.totalCartPrice}
                    </p>
                    <button
                        onClick={handlePayment}
                        className='bg-primary  w-full text-primary-foreground font-bold px-2 py-3 rounded-full cursor-pointer mt-3 block'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Place Your Order'}
                    </button>
                </div>
            </section>

        </main>
    )
}
