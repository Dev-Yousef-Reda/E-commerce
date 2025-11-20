import { addressType } from "_/app/checkout/checkout.types"
import { Button } from "_/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "_/components/ui/hover-card"

export function AddressHoverCard({ address }: { address: addressType }) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    variant="link"
                    className='p-0 text-blue-400 '
                >
                    {address.city}
                </Button>
            </HoverCardTrigger>

            <HoverCardContent className="w-50">
                <div className="flex justify-center gap-4 text-center ">
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-center"> {address.details} </h4>
                        <p className="text-sm text-center">
                            {address.phone}
                        </p>
                        <div className="text-muted-foreground text-xs text-center">
                            {address.city}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
