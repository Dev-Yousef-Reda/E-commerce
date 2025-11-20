'use client'

import { useState } from "react"
import { updateCartProductCountOrder } from "../../../actions/cartItems.actions"
import { Button } from "_/components/ui/button"
import { Spinner } from "_/components/ui/spinner"

export default function Decrease({ productCount, productId }: { productCount: number, productId: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function decreaseProductOrderCount() {
        setIsLoading(true)
        await updateCartProductCountOrder(productId, productCount, -1)
        setIsLoading(false)
    }

    return (
        <>
            {isLoading ?
                <Button
                    className='w-8 h-8 font-bold text-2xl  hover:bg-transparent p-0  bg-transparent  text-slate-600 border-1 border-slate-600 rounded-full '
                    disabled={true}
                >
                    <Spinner />
                </Button>
                :
                <Button
                    className='w-8 h-8  font-bold  hover:bg-transparent p-0  bg-transparent  text-slate-600 border-1 border-slate-600 rounded-full cursor-pointer  '
                    onClick={decreaseProductOrderCount}
                    disabled={isLoading}
                >
                    -
                </Button>
            }
        </>
    )
}
