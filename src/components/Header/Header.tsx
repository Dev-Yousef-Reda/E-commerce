
"use client"

import { HeroSection } from "_/components/hero-section"

export function HeroSectionDemo() {
    return (
        <div className=" bg-background  " >

            <HeroSection
                title="Quality You Can Feel."
                description="Discover premium-quality products special for those who value elegance and excellence. 
            Enjoy fast, reliable delivery and secure payment options — because you deserve nothing less."
            />
        </div>
    )
}
