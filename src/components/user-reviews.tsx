import ReviewDisplayCard from "./detailed-task/review-display-card";
import { useGetUserReviewsQuery } from "@/redux/slices/review-api-slice";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    ArrowDownWideNarrow,
    ArrowUpNarrowWide,
    RefreshCw,
} from "lucide-react";
import Spinner from "./spinner";

type Props = {
    userId: string;
};

const UserReviews = ({ userId }: Props) => {
    const [isDesc, setIsDesc] = useState(true);

    const {
        data: reviews,
        isLoading,
        refetch,
    } = useGetUserReviewsQuery({
        isDesc,
        userId,
    });

    useEffect(() => {
        const fetchData = async () => {
            await refetch();
        };

        fetchData();
    }, [refetch, isDesc]);

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

    if (!isLoading && reviews && reviews.length === 0) {
        return (
            <div className="flex flex-col w-full bg-white p-4 border border-black/15 rounded-xl">
                <div className="flex w-full justify-between items-center">
                    <h2 className="text-lg font-semibold px-2">
                        No User Reviews Yet
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
                <h2 className="text-xl font-semibold py-2 px-2">
                    User Reviews
                </h2>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => setIsDesc(!isDesc)}
                >
                    Sort by rating{" "}
                    {isDesc ? (
                        <ArrowDownWideNarrow className="size-4" />
                    ) : (
                        <ArrowUpNarrowWide className="size-4" />
                    )}
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {reviews &&
                    reviews.map((r) => (
                        <ReviewDisplayCard review={r} key={r.id} />
                    ))}
            </div>
        </div>
    );
};

export default UserReviews;
