"use client";
import { useGetAllTasksQuery } from "@/redux/slices/tasks-api-slice";
import { useSearchParams } from "next/navigation";
import Spinner from "../spinner";
import TaskCard from "./task-card";
import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

const TasksContainer = () => {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();

    const { data: tasks, isLoading: isFetching } =
        useGetAllTasksQuery(queryString);

    useEffect(() => {
        console.log(queryString);
    }, [queryString]);

    if (isFetching) {
        return <Spinner size={"large"} className="my-36 mx-auto" />;
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="my-24 mx-auto flex flex-col items-center justify-center">
                <TriangleAlert className="size-10  text-gray-500" />
                <h2 className="text-lg font-semibold text-gray-500 mt-2">
                    No tasks found
                </h2>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TasksContainer;
