'use client'
import { NavBar } from "_/components/ui/tubelight-navbar"

export function NavBarDemo() {
    const navItems = [
        { name: 'Home', url: '/', icon: <i className="fa-solid text-lg fa-house  "></i> },
        { name: 'userProfile', url: '/user-profile', icon: <i className="fa-solid text-lg fa-user"></i> },
        {name: 'cart', url: '/cart', icon: <i className="fa-solid text-lg fa-cart-shopping fa-xl"></i>},
        { name: 'wishlist', url: '/wishlist', icon: <i className="fa-solid text-lg fa-heart"></i> }
    ]

    return <NavBar items={navItems}   />
}