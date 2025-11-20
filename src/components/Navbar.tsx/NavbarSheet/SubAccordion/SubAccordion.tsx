import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "_/components/ui/accordion"
import { productType } from "_/types/product.type"
import SubCategoryProducts from "../../SubCategoryProducts/SubCategoryProducts"

export function SubAccordion({ subCategory, products }:
    { subCategory: string, products: productType[] | undefined }) {
    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue=""
        >
            {products?.length === 0 &&
                <p> Loading...  <i className="fa-solid fa-spinner fa-spin"></i> </p>
            }
            <AccordionItem value="item-1">

                <AccordionTrigger> {subCategory} </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 text-balance"  >
                    <SubCategoryProducts subCategory={subCategory} products={products} insideNavSheet={true} />
                </AccordionContent>

            </AccordionItem>

        </Accordion>
    )
}
