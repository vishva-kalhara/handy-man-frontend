"use client";
import FilterForm from "@/forms/tasks/filter-form";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import TasksContainer from "@/components/home/tasks-container";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const filteredEntries = [
            ["sortBy", "createdAt"],
            ["sortDir", "desc"],
        ];

        const queryString = new URLSearchParams(
            filteredEntries as [string, string][]
        ).toString();

        router.push(`?${queryString}`);
    }, [router]);

    return (
        <Suspense fallback={<div className="my-36 mx-auto">Loading...</div>}>
            <>
                <FilterForm />
                <TasksContainer />
            </>
        </Suspense>
    );
}
