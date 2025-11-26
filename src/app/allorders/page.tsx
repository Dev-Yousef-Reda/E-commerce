import React from 'react'
import { getAllOrders } from './services/allorders.services'
import { addressType } from '../checkout/checkout.types'
import { AddressHoverCard } from './HoverCard/AddressHoverCard'
import { cartProductType } from '_/types/cart.types'
import Image from 'next/image'

type userType = {
  _id: string,
  name: string,
  email: string,
  phone: string,
}

type orderType = {
  shippingAddress: addressType,
  totalOrderPrice: number,
  paymentMethodType: string,
  isPaid: boolean,
  isDelivered: boolean,
  _id: string,
  user: userType,
  cartItems: cartProductType[],
  createdAt: string
}

function detectDate(date: string) {

  const purchaseDate = new Date(date);

  const stringDate = purchaseDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',  // or 'numeric' if you want "Oct 13 2025" → "Oct 13 2025" (same)
    year: 'numeric'
  });

  return stringDate
}


export const metadata = {
  title: "all orders",
}

export default async function page() {

  const allorders: orderType[] = await getAllOrders()

  return (
    <section className='mt-[100px] lg:mt-[210px] w-[90%] mx-auto mb-10 ' >

      <h1 className={` text-slate-600 font-bold text-2xl mb-5 `} >
        Orders
      </h1>

      {allorders?.map((order) =>
        <section key={order._id} className='border-border shadow-xl  rounded-xl not-last:mb-5 bg-card ' >
          <header className=' grid grid-cols-2 bg-accent md:grid-cols-4 gap-5 p-5 rounded-t-xl text-accent-foreground uppercase' >
            <div className='w-max ' >
              <p>Order Placed</p>
              <p> {detectDate(order.createdAt)} </p>
            </div>
            <div>
              <p>Total Price</p>
              <p> {order.totalOrderPrice} EGP </p>
            </div>

            <div>
              <p>Ship to</p>
              <AddressHoverCard address={order.shippingAddress} />
            </div>

            <div>
              <p> {order.isDelivered ? 'Delivered' : `Isn't Delivered`} </p>
            </div>
          </header>

          <div className='p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '  >

            {order.cartItems.map((item) =>

              <div className='' key={item.product._id}  >
                <div className='text-slate-500' >
                    <div className='w-[100px] ' >
                      < Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        width={400}
                        height={400}
                        className=' w-full '
                      />
                    </div>

                    <div className='text-foreground mt-3' >
                      <p className='line-clamp-1 mb-1.5 ' > {(item.product.title).split(' ', 2).join(' ')} </p>
                      <p> count: {item.count} </p>
                    </div>
                </div>
              </div>

            )}

          </div>
        </section>
      )
      }

    </section >
  )
}
