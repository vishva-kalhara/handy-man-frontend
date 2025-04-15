import { CircleX } from "lucide-react";
import Spinner from "../spinner";
import { Bid } from "@/types/bid";

const BidDetails = ({ bid }: { bid: Bid }) => {
    return (
        <div
            key={"bid" + bid.id}
            className="w-full py-2 flex gap-2 items-center"
        >
            {bid.bidStatus == "PENDING" ? (
                <Spinner className="mx-1.5" />
            ) : (
                <CircleX
                    fill="oklch(70.4% 0.191 22.216)"
                    stroke="white"
                    className="size-8"
                />
            )}
            <span className="text-base text-black/60 font-medium">
                {bid.bidStatus == "PENDING"
                    ? "Pending offer - "
                    : "Rejected - "}
                {new Intl.NumberFormat("en-LK", {
                    style: "currency",
                    currency: "LKR",
                    maximumFractionDigits: 0,
                }).format(bid.price)}
            </span>
        </div>
    );
};

export default BidDetails;
