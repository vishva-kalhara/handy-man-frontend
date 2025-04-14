"use client";
import PageMessage from "@/components/page-message";
import StageButton from "@/components/stage-button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
    const { refetch } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const signOutFn = () => {
        setIsLoading(true);
        localStorage.removeItem("token");
        try {
            setTimeout(async () => {
                setIsLoading(false);
                await refetch();
                router.push("/");
            }, 50);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <PageMessage
            title="Sure you want to sign out?"
            description="Please confirm if you want to proceed with signing out."
        >
            <StageButton handleSubmit={signOutFn} isSubmitting={isLoading}>
                Sign Out
            </StageButton>
        </PageMessage>
    );
};

export default Page;
