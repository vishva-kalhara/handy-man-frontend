'use client";';
import { useDeleteTaskMutation } from "@/redux/slices/tasks-api-slice";
import { useRouter } from "next/navigation";
import StageButton from "../stage-button";
import { useState } from "react";

const DeleteTaskCard = ({ taskId }: { taskId: string }) => {
    const [deleteFn] = useDeleteTaskMutation();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await deleteFn(taskId);
            setTimeout(() => {
                setIsLoading(false);
                router.replace("/");
            }, 1500);
        } catch (error) {
            console.error("Error deleting task:", error);
            window.location.reload();
        }
    };

    return (
        <div className="flex bg-red-100/75 p-6 border border-red-400 rounded-xl relative flex-col">
            <h4 className="font-semibold text-base text-red-600">
                Sure you want to delete the task?
            </h4>
            <p className="text-black/60 mt-2 text-sm mb-4">
                This action cannot be undone. Once you delete this task, it will
                be permanently removed from your list.
            </p>
            <StageButton
                handleSubmit={handleDelete}
                isSubmitting={isLoading}
                className="bg-red-600 hover:bg-red-700"
            >
                Delete Task
            </StageButton>
        </div>
    );
};

export default DeleteTaskCard;
