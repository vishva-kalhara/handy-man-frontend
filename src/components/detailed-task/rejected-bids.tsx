import { Bid } from "@/types/bid";
import { CircleX } from "lucide-react";

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
                bids.map((bid) => (
                    <div
                        key={"bid" + bid.id}
                        className="w-full py-2 flex gap-2 items-center"
                    >
                        <CircleX
                            fill="oklch(70.4% 0.191 22.216)"
                            stroke="white"
                            className="size-8"
                        />
                        <span className="text-base text-black/60 font-medium">
                            Rejected (LKR {bid.price})
                        </span>
                    </div>
                ))
            )}
        </div>
    );
};

export default RejectedBids;
