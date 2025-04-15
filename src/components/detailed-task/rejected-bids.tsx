import { Bid } from "@/types/bid";
import BidDetails from "./bid-details";

const RejectedBids = ({ bids }: { bids: Bid[] }) => {
    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Previous Offers</h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                Study the competition. These bids didn&apos;t make the cut
                &#8211; make yours stand out!
            </p>
            {!bids || bids.length == 0 ? (
                <p className="text-gray-500 font-semibold bg-gray-50 py-2.5 px-4 rounded-md mt-2 text-center text-sm border border-gray-200">
                    No Previous Offers!
                </p>
            ) : (
                bids
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((bid) => <BidDetails bid={bid} key={bid.id} />)
            )}
        </div>
    );
};

export default RejectedBids;
