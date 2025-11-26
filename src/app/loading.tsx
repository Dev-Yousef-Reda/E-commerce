import React from 'react'

export default function loading() {
    return (
        <div className='fixed inset-0 left-0 top-0 flex justify-center items-center'>
            <i className="fa-solid fa-arrow-rotate-right text-10xl text-foreground fa-spin"></i>
        </div>
    )
}
