"use client";
import { useGetUserQuery } from "@/redux/slices/user-api-slice";
import PageLoadingCard from "../page-loading-card";
import PageMessage from "../page-message";
import QuickProfileCard from "../quick-profile-card";
import UserReviews from "../user-reviews";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import SignOutButton from "./sign-out-button";
import { useState } from "react";

type Props = {
    isLoggedInUser: boolean;
    userId: string;
};

const DetailedUserBase = ({ userId, isLoggedInUser }: Props) => {
    const [section, setSection] = useState<"REVIEWS" | "TASKS">("REVIEWS");

    const { data: user, isLoading } = useGetUserQuery(userId);

    if (isLoading) {
        return <PageLoadingCard />;
    }

    if (isLoading || !user) {
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
            <div className="sm:max-w-2/5 w-full flex flex-col gap-4">
                <QuickProfileCard user={user} />
                {isLoggedInUser && (
                    <>
                        <Button
                            onClick={() =>
                                setSection(
                                    section == "REVIEWS" ? "TASKS" : "REVIEWS"
                                )
                            }
                            className="h-12"
                        >
                            View My {section == "REVIEWS" ? "Tasks" : "Reviews"}{" "}
                            <ArrowRight className="size-4" />
                        </Button>
                        <SignOutButton />
                    </>
                )}
            </div>
            <div className="w-full flex flex-col gap-4 md:gap-6">
                {section == "REVIEWS" ? (
                    <UserReviews userId={user.id} />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default DetailedUserBase;
