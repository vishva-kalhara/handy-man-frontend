import { ArrowRight } from "lucide-react";
import StageButton from "../stage-button";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
    const { refetch } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const signOutFn = () => {
        setIsLoading(true);
        localStorage.removeItem("token");
        try {
            setTimeout(async () => {
                router.push("/");
                await refetch();
            }, 1500);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col w-full -mt-2">
            <StageButton
                handleSubmit={signOutFn}
                isSubmitting={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white w-full"
            >
                Sign Out <ArrowRight className="size-4" />
            </StageButton>
        </div>
    );
};

export default SignOutButton;
