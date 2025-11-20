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
                    <SheetTitle>Logo Here</SheetTitle>
                </SheetHeader>

                <div className=" w-[90%] mx-auto overflow-y-auto ">
                    
                    <SheetToggleableContent products={products} categories={categories} isLoading={isLoading} />
                </div>
            </SheetContent>
        </Sheet>
    )
}
