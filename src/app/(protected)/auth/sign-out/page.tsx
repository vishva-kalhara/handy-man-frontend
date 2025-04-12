"use client";
import PageMessage from "@/components/page-message";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const Page = () => {
    const { refetch } = useAuth();

    const router = useRouter();

    const signOutFn = () => {
        localStorage.removeItem("token");
        try {
            setTimeout(async () => {
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
            <Button onClick={signOutFn}>Sign Out</Button>
        </PageMessage>
    );
};

export default Page;
