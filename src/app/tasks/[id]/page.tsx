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
import OffersManagementCard from "@/components/detailed-task/offers-management";
import CompleteTaskCard from "@/components/detailed-task/complete-task-card";
import ReviewCard from "@/components/detailed-task/review-card";
import ChosenCard from "@/components/detailed-task/chosen-card";

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
        <div className="gap-4 md:gap-6 flex items-start flex-col sm:flex-row w-full md:max-w-5xl mx-auto">
            <DetailedTaskCard task={task} />
            <div className="sm:max-w-2/5 w-full flex flex-col gap-4 md:gap-6">
                {task.taskStatus != "PENDING" &&
                    user &&
                    task.chosenBidder.id == user.id && <ChosenCard />}
                {task.taskStatus == "COMPLETED" &&
                    user &&
                    task.creator.id == user?.id && (
                        <ReviewCard
                            reviewType="TASK_OWNER"
                            reviewedToId={task.chosenBidder.id}
                            taskId={id}
                        />
                    )}
                {task.taskStatus == "COMPLETED" &&
                    user &&
                    task.chosenBidder.id == user?.id && (
                        <ReviewCard
                            reviewType="HANDY_MAN"
                            reviewedToId={task.creator.id}
                            taskId={id}
                        />
                    )}

                {user && task.creator.id == user.id ? (
                    <>
                        {task.taskStatus == "WAITING_TO_COMPLETE" && (
                            <CompleteTaskCard taskId={id} />
                        )}
                        <TaskOptions
                            taskId={task.id}
                            isPending={task.taskStatus == "PENDING"}
                        />
                        {task.taskStatus == "PENDING" && (
                            <OffersManagementCard
                                bids={task.bids.filter(
                                    (bid) => bid.bidStatus == "PENDING"
                                )}
                            />
                        )}
                    </>
                ) : (
                    (!user || task.chosenBidder.id != user.id) && (
                        <>
                            <QuickProfileCard user={task.creator} />
                            <BiddingCard
                                taskId={task.id}
                                taskStatus={task.taskStatus}
                            />
                        </>
                    )
                )}
                {task.taskStatus == "PENDING" && (
                    <RejectedBids
                        bids={task.bids.filter(
                            (bid) => bid.bidStatus == "REJECTED"
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default Page;
