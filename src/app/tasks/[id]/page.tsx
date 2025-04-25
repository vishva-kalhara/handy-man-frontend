"use client";
import PageLoadingCard from "@/components/page-loading-card";
import PageMessage from "@/components/page-message";
import { useGetOneTaskQuery } from "@/redux/slices/tasks-api-slice";
import { useParams } from "next/navigation";
import DetailedTaskCard from "../../../components/detailed-task/detailed-task-card";
import QuickProfileCard from "@/components/quick-profile-card";
import BiddingCard from "../../../components/detailed-task/bidding-card";
import RejectedBids from "../../../components/detailed-task/rejected-bids";
import { useAuth } from "@/hooks/use-auth";
import TaskOptions from "@/components/detailed-task/task-options";
import OffersManagementCard from "@/components/detailed-task/offers-management";
import CompleteTaskCard from "@/components/detailed-task/complete-task-card";
import ReviewCard from "@/components/detailed-task/review-card";
import ChosenCard from "@/components/detailed-task/chosen-card";
import ReviewDisplayCard from "@/components/detailed-task/review-display-card";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { DetailedTaskContext } from "@/contexts/detailed-task-context";
import ManagePollingCard from "@/components/detailed-task/manage-polling-card";
import MiniChat from "@/components/chat/mini-chat";

const Page = () => {
    const { id } = useParams<{ id: string }>();

    const { user } = useAuth();

    const [task, setTask] = useState<Task | undefined>(undefined);
    const [isPolling, setIsPolling] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);

    const { data, isLoading, isError, refetch } = useGetOneTaskQuery(id, {
        pollingInterval: isPolling ? 5000 : 0,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        if (data) {
            setTask(data);
        }
    }, [data]);

    if (isLoading) {
        return <PageLoadingCard />;
    }

    if (isError || !data || !task) {
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
        <DetailedTaskContext.Provider
            value={{ task, refetch, polling: { isPolling, setIsPolling } }}
        >
            <div className="gap-4 md:gap-6 flex items-start flex-col sm:flex-row w-full md:max-w-5xl mx-auto">
                <DetailedTaskCard task={task} />
                <div className="sm:max-w-2/5 w-full flex flex-col gap-4 md:gap-6">
                    <ManagePollingCard />
                    {task.taskStatus != "PENDING" &&
                        user &&
                        task.chosenBidder?.id == user.id && <ChosenCard />}

                    {task.taskStatus == "WAITING_TO_COMPLETE" &&
                        user &&
                        user.id == task.chosenBidder?.id && (
                            <MiniChat
                                isChatSelected={task.creator}
                                setIsChatSelected={setIsChatVisible}
                            />
                        )}
                    {task.taskStatus == "WAITING_TO_COMPLETE" &&
                        user &&
                        user.id == task.creator?.id && (
                            <MiniChat
                                isChatSelected={task.chosenBidder!}
                                setIsChatSelected={setIsChatVisible}
                            />
                        )}

                    {task.taskStatus == "COMPLETED" &&
                        user &&
                        task.creator.id == user?.id &&
                        ((task.reviews &&
                            task.reviews.filter(
                                (r) => r.reviewedBy.id == user.id
                            ).length === 0) ||
                            !task.reviews) && (
                            <ReviewCard
                                reviewType="TASK_OWNER"
                                reviewedToId={task.chosenBidder?.id || ""}
                                taskId={id}
                            />
                        )}
                    {task.taskStatus == "COMPLETED" &&
                        user &&
                        task.creator.id == user.id &&
                        task.reviews &&
                        task.reviews.filter(
                            (r) => r.reviewGot.id == user.id
                        )[0] && (
                            <ReviewDisplayCard
                                review={
                                    task.reviews &&
                                    user &&
                                    task.reviews.filter(
                                        (r) => r.reviewGot.id == user.id
                                    )[0]
                                }
                            />
                        )}

                    {task.taskStatus == "COMPLETED" &&
                        user &&
                        task.chosenBidder?.id == user.id &&
                        ((task.reviews &&
                            task.reviews.filter(
                                (r) => r.reviewedBy.id == user.id
                            ).length === 0) ||
                            !task.reviews) && (
                            <ReviewCard
                                reviewType="HANDY_MAN"
                                reviewedToId={task.creator.id}
                                taskId={id}
                            />
                        )}
                    {task.taskStatus == "COMPLETED" &&
                        user &&
                        task.chosenBidder?.id == user.id &&
                        task.reviews &&
                        task.reviews.filter(
                            (r) => r.reviewGot.id == user.id
                        )[0] && (
                            <ReviewDisplayCard
                                review={
                                    task.reviews &&
                                    user &&
                                    task.reviews.filter(
                                        (r) => r.reviewGot.id == user.id
                                    )[0]
                                }
                            />
                        )}

                    {task.taskStatus == "COMPLETED" &&
                        user &&
                        task.reviews &&
                        task.reviews.filter(
                            (t) => t.reviewedBy.id == user.id
                        )[0] && (
                            <ReviewDisplayCard
                                ReviewIDid
                                review={
                                    task.reviews &&
                                    user &&
                                    task.reviews.filter(
                                        (r) => r.reviewedBy.id == user.id
                                    )[0]
                                }
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
                        (!user || task.chosenBidder?.id != user.id) && (
                            <>
                                {isChatVisible ? (
                                    <div className="flex overflow-hidden bg-white border border-black/15 rounded-xl relative flex-col min-h-[50dvh] h-full max-h-[80vh]">
                                        <MiniChat
                                            isChatSelected={task.creator}
                                            setIsChatSelected={setIsChatVisible}
                                        />
                                    </div>
                                ) : (
                                    <QuickProfileCard
                                        user={task.creator}
                                        setIsChatVisible={setIsChatVisible}
                                    />
                                )}
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
                                (bid) => bid.bidStatus != "ACCEPTED"
                            )}
                        />
                    )}
                </div>
            </div>
        </DetailedTaskContext.Provider>
    );
};

export default Page;
