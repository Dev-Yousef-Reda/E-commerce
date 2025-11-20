import { Accordion, AccordionContent, AccordionItem } from "_/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { Plus } from "lucide-react";
import { productType } from "_/types/product.type";
import { categoryType } from "_/types/category.types";
import SubCategories from "../../SubCategories/SubCategories";

export default function SheetToggleableContent({ products, categories, isLoading }
    : { products: productType[], categories: categoryType[] | null, isLoading: boolean }
) {

    return (
        <div className="">

            <Accordion type="single" collapsible className="w-full" defaultValue="3">

                {products.length === 0 && ''
                }

                {categories?.map((category) => (
                    <AccordionItem value={category._id} key={category._id} className="py-2">

                        <AccordionPrimitive.Header className="flex">

                            <AccordionPrimitive.Trigger className="flex flex-1 items-center justify-between py-2 text-left text-[15px] font-semibold leading-6 transition-all [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 [&[data-state=open]>svg]:rotate-180">
                                {category.name}
                                <Plus
                                    size={16}
                                    strokeWidth={2}
                                    className="shrink-0 opacity-60 transition-transform duration-200"
                                    aria-hidden="true"
                                />
                            </AccordionPrimitive.Trigger>

                        </AccordionPrimitive.Header>

                        <AccordionContent className="pb-2 text-muted-foreground">
                            {isLoading && <p> Loading... xxx  <i className="fa-solid fa-spinner fa-spin"></i> </p> }
                            <SubCategories categoryId={category._id} products={products} insideNavSheet={true} />
                        </AccordionContent>

                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

