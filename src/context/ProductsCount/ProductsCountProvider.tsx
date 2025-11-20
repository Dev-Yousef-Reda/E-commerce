'use client'
import React, { createContext, ReactNode, useState } from 'react'

type cartItemsContextType = { cartItemsCount: number; updateCartItemsCount: (itemsCount: number) => void; }

export const cartItemsCountContext = createContext<cartItemsContextType>({
    cartItemsCount: 0,
    updateCartItemsCount: () => { },
})

export default function CartCountContextProvider({ children }: { children: ReactNode }) {

    const [cartItemsCount, setCartItemsCount] = useState(0);

    function updateCartItemsCount(itemsCount: number) {
        setCartItemsCount(itemsCount)
    }

    return (
        <cartItemsCountContext.Provider value={{ cartItemsCount, updateCartItemsCount }} >
            {children}
        </cartItemsCountContext.Provider>
    )
}
