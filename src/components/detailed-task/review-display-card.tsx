import { Review } from "@/types/review";
import { Star } from "lucide-react";

const ReviewDisplayCard = ({
    review,
    ReviewIDid = false,
}: {
    review: Review | undefined;
    ReviewIDid?: boolean;
}) => {
    if (!review) return <></>;

    const { reviewGotAsRole, reviewText, ratedValue } = review;

    return (
        <div className="flex bg-white p-4 border border-black/15 rounded-xl relative flex-col">
            <p className="text-gray-500 font-semibold bg-gray-50 py-2.5 px-4 rounded-md text-center text-sm border border-gray-200">
                {ReviewIDid
                    ? "Review I given"
                    : reviewGotAsRole == "TASK_OWNER"
                    ? "Handyman reviewed you!"
                    : "Task owner reviewed you!"}
            </p>
            <div className="p-4 flex flex-col gap-2">
                <p className="font-newsReader font-semibold text-lg text-center mt-4 text-[#1e1e1e]">
                    &quot;{reviewText}
                    {!reviewText.endsWith(".") && "."}&quot;
                </p>
                <div className="flex justify-center gap-2 items-center">
                    <Star fill="#1e1e1e" className="size-4" />{" "}
                    <span className="font-semibold text-sm">
                        {ratedValue}.0
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ReviewDisplayCard;
