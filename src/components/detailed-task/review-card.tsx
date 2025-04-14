"use client";
import AddReviewForm from "@/forms/reviews/add-review-form";

type Props = {
    reviewType: "HANDY_MAN" | "TASK_OWNER";
    taskId: string;
    reviewedToId: string;
};

const ReviewCard = ({ reviewType, reviewedToId, taskId }: Props) => {
    const getDescription = () => {
        if (reviewType == "TASK_OWNER") {
            return "Help build trust in our community! Rate your handyman's work quality, timeliness, and professionalism. Your review helps others find reliable help.";
        } else {
            return "How was your experience working with this client? Rate their clarity, responsiveness, and payment fairness to help handyman decide on future tasks.";
        }
    };

    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Review Now</h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                {getDescription()}
            </p>
            <AddReviewForm reviewedToId={reviewedToId} taskId={taskId} />
        </div>
    );
};

export default ReviewCard;
