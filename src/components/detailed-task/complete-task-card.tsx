import { useState } from "react";
import StageButton from "../stage-button";

const CompleteTaskCard = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
        console.log("Task completed!");
    };

    return (
        <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base">Complete the Task</h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                Confirm this task is fully completed to release payment and
                leave a review. Only mark as complete if you&apos;re satisfied
                with the work.
            </p>
            <StageButton
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            >
                Complete Task
            </StageButton>
        </div>
    );
};

export default CompleteTaskCard;
