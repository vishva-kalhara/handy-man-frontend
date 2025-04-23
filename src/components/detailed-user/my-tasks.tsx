"use client";

import { useGetMyTasksQuery } from "@/redux/slices/tasks-api-slice";
import Spinner from "../spinner";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import TaskCard from "../home/task-card";

const MyTasks = () => {
    const { data: tasks, isLoading, refetch } = useGetMyTasksQuery();

    const handleRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error("Error refetching reviews:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col w-full bg-white p-4 border border-black/15 rounded-xl">
                <div className="w-full flex justify-center my-12">
                    <Spinner size={"large"} />
                </div>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col w-full bg-white p-4 border border-black/15 rounded-xl">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-lg font-semibold px-2">
                        No listed tasks yet
                    </h2>
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        onClick={() => handleRefresh()}
                    >
                        <RefreshCw className="size-4" /> Refresh
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full bg-white p-4 border border-black/15 rounded-xl">
            <div className="flex w-full justify-between items-center">
                <h2 className="text-xl font-semibold py-2 px-2">My Tasks</h2>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => handleRefresh()}
                >
                    <RefreshCw className="size-4" /> Refresh
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {tasks && tasks.map((t) => <TaskCard task={t} key={t.id} />)}
            </div>
        </div>
    );
};

export default MyTasks;
