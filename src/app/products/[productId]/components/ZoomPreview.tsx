import React, { useEffect, useState } from 'react'

export default function ZoomPreview({ showZoomPreview, urlPreview, x, y }:
    { showZoomPreview: boolean, urlPreview: string, x: number, y: number }) {

    const [ZoomPreview, setZoomPreview] = useState(false);

    useEffect(() => {
        function handleShowZoomPreview() {
            const x = window.innerWidth
            if (x >= 1280) {
                setZoomPreview(true)
            } else {
                setZoomPreview(false)
            }
        }
        handleShowZoomPreview()

        window.addEventListener('resize', handleShowZoomPreview)

        return () => window.removeEventListener('resize', handleShowZoomPreview)
    }, [])

    return (
        <div
            className={
                `  w-[100%] left-[102%] h-full top-0  ${ZoomPreview ? 'absolute z-[1000] ' : 'hidden'} ${showZoomPreview ? 'block' : 'hidden'} transition-[opacity] duration-300 rounded-xl overflow-hidden `
            }
            style={{
                backgroundImage: `url(${urlPreview})`,
                backgroundSize: '130% auto',
                backgroundPosition: `${x}% ${y}%`,
            }}
        >
        </div>
    )
}
