"use client";
import { useGetAllTasksQuery } from "@/redux/slices/tasks-api-slice";
import { useSearchParams } from "next/navigation";
import Spinner from "../spinner";
import TaskCard from "./task-card";
import { useEffect } from "react";

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {tasks ? (
                tasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
                <p className="text-center">No Tasks</p>
            )}
        </div>
    );
};

export default TasksContainer;
