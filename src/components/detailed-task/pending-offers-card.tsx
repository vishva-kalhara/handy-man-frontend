import { Bid } from "@/types/bid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { OfferAction } from "./offers-management";

type Props = {
    bids: Bid[];
    setAction: Dispatch<SetStateAction<OfferAction | undefined>>;
};

const PendingOffersCard = ({ bids, setAction }: Props) => {
    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Pending Offers</h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                Review all submitted bids for your task. Compare prices,
                ratings, and response times before selecting the best fit.
            </p>
            {!bids || bids.length == 0 ? (
                <p className="text-gray-500 font-semibold bg-gray-50 py-2.5 px-4 rounded-md mt-2 text-center text-sm border border-gray-200">
                    No Previous Offers!
                </p>
            ) : (
                bids.map((bid) => (
                    <div
                        key={"bid" + bid.id}
                        className="w-full py-2 flex gap-2 items-center justify-between"
                    >
                        <div className="flex gap-5 items-center">
                            <Link href={`/users/${bid.bidder.id}`}>
                                {bid.bidder.profileImage ? (
                                    <div className="relative w-[50px] h-[50px] rounded-full border-black/10 hover:border-black/25 hover:cursor-pointer duration-100 transition-all border-2">
                                        <Image
                                            alt="img"
                                            src={bid.bidder.profileImage}
                                            fill
                                            className={`rounded-full object-cover`}
                                            sizes="100vw"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center inset-0 w-[50px] h-[50px] rounded-full bg-gray-200">
                                        <span className="text-base font-bold text-gray-500">
                                            {bid.bidder.displayName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </Link>
                            <span className="text-lg font-semibold text-black/80">
                                {new Intl.NumberFormat("en-LK", {
                                    style: "currency",
                                    currency: "LKR",
                                    maximumFractionDigits: 0,
                                }).format(bid.price)}
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Button
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() =>
                                    setAction({
                                        action: "TO_BE_REJECTED",
                                        bidder: bid.bidder,
                                        price: new Intl.NumberFormat("en-LK", {
                                            style: "currency",
                                            currency: "LKR",
                                            maximumFractionDigits: 0,
                                        }).format(bid.price),
                                    })
                                }
                            >
                                <X strokeWidth={5} />
                            </Button>
                            <Button
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() =>
                                    setAction({
                                        action: "TO_BE_ACCEPTED",
                                        bidder: bid.bidder,
                                        price: new Intl.NumberFormat("en-LK", {
                                            style: "currency",
                                            currency: "LKR",
                                            maximumFractionDigits: 0,
                                        }).format(bid.price),
                                    })
                                }
                            >
                                <Check strokeWidth={5} />
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PendingOffersCard;
