import { Button } from "_/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "_/components/ui/sheet"
import { categoryType } from "_/types/category.types"
import { productType } from "_/types/product.type"
import SheetToggleableContent from "./SheetToggleableContent/SheetToggleableContent"

export function NavbarSheet({ products, categories, isLoading }
    : { products: productType[], categories: categoryType[] | null, isLoading: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-transparent border-0 p-0 hover:bg-transparent me-1.5 cursor-pointer block md:hidden "
                >
                    <i className="fa-solid fa-bars"></i>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" >
                <SheetHeader>
                    <SheetTitle>
                        <div className=' w-[200px] ' >
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
                    </SheetTitle>
                </SheetHeader>

                <div className=" w-[90%] mx-auto overflow-y-auto ">
                    
                    <SheetToggleableContent products={products} categories={categories} isLoading={isLoading} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
