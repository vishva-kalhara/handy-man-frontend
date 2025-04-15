import { Bid } from "@/types/bid";
import OfferOptionsCard from "./offer-options-card";
import PendingOffersCard from "./pending-offers-card";
import { useState } from "react";
import { User } from "@/types/user";

export type OfferAction = {
    action: "TO_BE_ACCEPTED" | "TO_BE_REJECTED";
    bidder: Pick<User, "id" | "profileImage" | "displayName" | "avgRating">;
    price: string;
    bidId: string;
};

const OffersManagementCard = ({ bids }: { bids: Bid[] }) => {
    const [action, setAction] = useState<OfferAction | undefined>(undefined);

    return (
        <>
            <PendingOffersCard bids={bids} setAction={setAction} />
            {action != undefined && (
                <OfferOptionsCard
                    setAction={setAction}
                    bidId={action.bidId}
                    action={action.action}
                    bidder={action.bidder}
                    price={action.price}
                />
            )}
        </>
    );
};

export default OffersManagementCard;
