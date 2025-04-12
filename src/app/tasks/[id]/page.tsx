"use client";
import PageLoadingCard from "@/components/page-loading-card";
import PageMessage from "@/components/page-message";
import { useGetOneTaskQuery } from "@/redux/slices/tasks-api-slice";
import { useParams } from "next/navigation";
import DetailedTaskCard from "../../../components/detailed-task/detailed-task-card";
import QuickProfileCard from "@/components/detailed-task/quick-profile-card";
import BiddingCard from "../../../components/detailed-task/bidding-card";
import RejectedBids from "../../../components/detailed-task/rejected-bids";
import { useAuth } from "@/hooks/use-auth";
import TaskOptions from "@/components/detailed-task/task-options";

const Page = () => {
    const { id } = useParams<{ id: string }>();

    const { user } = useAuth();

    const { data: task, isLoading, isError } = useGetOneTaskQuery(id);

    if (isLoading) {
        return <PageLoadingCard />;
    }

    if (isError || !task) {
        return (
            <PageMessage
                tag="Not Found"
                title="Page Not found"
                description="This page isn't where you left it. Try checking the link or head back home."
                links={{
                    action: {
                        text: "Back to Home",
                        link: "/",
                    },
                }}
            />
        );
    }

    return (
        <div className="gap-4 md:gap-6 flex flex-col sm:flex-row w-full md:max-w-5xl mx-auto">
            <DetailedTaskCard task={task} />
            <div className="sm:max-w-2/5 w-full flex flex-col gap-4 md:gap-6">
                {user && task.creator.id !== user.id ? (
                    <>
                        <QuickProfileCard user={task.creator} />
                        <BiddingCard taskId={task.id} />
                    </>
                ) : (
                    <TaskOptions taskId={task.id} />
                )}
                <RejectedBids bids={task.bids} />
            </div>
        </div>
    );
};

export default Page;
