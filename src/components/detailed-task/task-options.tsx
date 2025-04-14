"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import DeleteTaskCard from "./delete-task-card";

type Props = { taskId: string; isPending: boolean };

const TaskOptions = ({ taskId, isPending }: Props) => {
    const [isDeletingCardVisible, setIsDeletingCardVisible] = useState(false);

    return (
        <>
            <div className="flex bg-white p-6 border border-black/15 rounded-xl relative items-center justify-between">
                <p className="font-semibold text-gray-500 text-base">
                    Your Task
                </p>
                <Button
                    disabled={!isPending}
                    variant="destructive"
                    onClick={() => setIsDeletingCardVisible(true)}
                >
                    <Trash2 /> Delete
                </Button>
            </div>
            {isDeletingCardVisible && <DeleteTaskCard taskId={taskId} />}
        </>
    );
};

export default TaskOptions;
