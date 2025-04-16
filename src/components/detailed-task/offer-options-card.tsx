"use client";
import { cn } from "@/lib/utils";
import FormButton from "../form-button";
import { User } from "@/types/user";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateBidStatusMutation } from "@/redux/slices/bids-api-slice";
import { useTask } from "@/contexts/detailed-task-context";
import { OfferAction } from "./offers-management";

type Props = {
    action: "TO_BE_ACCEPTED" | "TO_BE_REJECTED";
    bidder: Pick<User, "id" | "profileImage" | "displayName" | "avgRating">;
    price: string;
    bidId: string;
    setAction: Dispatch<SetStateAction<OfferAction | undefined>>;
};

const OfferOptionsCard = ({
    action,
    bidder,
    price,
    bidId,
    setAction,
}: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { refetch } = useTask();

    const [updateFn] = useUpdateBidStatusMutation();

    const handleAction = async () => {
        try {
            setIsSubmitting(true);

            console.log("Bid ID:", bidId);
            console.log(action);

            await updateFn({
                bidId,
                bidStatus: action == "TO_BE_ACCEPTED" ? "ACCEPTED" : "REJECTED",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(async () => {
                setIsSubmitting(false);
                await refetch();
                setAction(undefined);
                // window.location.reload();
            }, 3000);
        }
    };

    return (
        <div
            className={cn(
                "flex rounded-xl relative flex-col p-6 border",
                action == "TO_BE_ACCEPTED"
                    ? " bg-green-100/75 border-green-400"
                    : "bg-red-100/75 border-red-400"
            )}
        >
            <h4
                className={cn(
                    "font-semibold text-base",
                    action == "TO_BE_ACCEPTED"
                        ? "text-green-600"
                        : "text-red-600"
                )}
            >
                Sure you want to{" "}
                {action == "TO_BE_ACCEPTED" ? "accept" : "reject"} the offer?
            </h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                This action cannot be undone. Once you{" "}
                {action == "TO_BE_ACCEPTED"
                    ? "accept, you cannot change the selected handy man and this task will no longer accepts offers."
                    : "reject, it will be permanently removed from the pending state."}
            </p>
            <Link href={`/users/${bidder.id}`} className="w-full">
                <div className="w-full bg-white/30 rounded-md p-8 mt-2 mb-4 border-2 border-white hover:bg-white/45 duration-150 transition-all hover:cursor-pointer justify-center">
                    <div className="relative w-[100px] h-[100px] rounded-full border-black/10 border-2 mx-auto">
                        {bidder.profileImage ? (
                            <Image
                                alt="img"
                                src={bidder.profileImage}
                                fill
                                className={`rounded-full object-cover`}
                                sizes="100vw"
                            />
                        ) : (
                            <div className="absolute flex justify-center items-center inset-0 w-[100px] h-[100px] rounded-full bg-gray-200">
                                <span className="text-4xl font-bold text-gray-500">
                                    {bidder.displayName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 h-[28px] flex gap-1 items-center px-2.5 bg-[#1e1e1e] rounded-full">
                            {bidder.avgRating ? (
                                <>
                                    <Star fill="#fff" className="size-4" />
                                    <span className="text-xs text-white font-semibold">
                                        {bidder.avgRating}
                                    </span>
                                </>
                            ) : (
                                <span className="text-xs text-white font-semibold">
                                    N/A
                                </span>
                            )}
                        </div>
                    </div>
                    <h4 className="text-center font-semibold text-xl text-black/80 mt-6">
                        {bidder.displayName} ({price})
                    </h4>
                </div>
            </Link>
            <FormButton
                isSubmitting={isSubmitting}
                onClick={handleAction}
                className={
                    action == "TO_BE_ACCEPTED"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-red-600 hover:bg-red-700"
                }
            >
                Confirm {action == "TO_BE_ACCEPTED" ? "Accept" : "Reject"}
            </FormButton>
        </div>
    );
};

export default OfferOptionsCard;
