"use client";
import ForbiddenCard from "@/components/forbidden";
import PageLoadingCard from "@/components/page-loading-card";
import { useAuth } from "@/hooks/use-auth";
import { PropsWithChildren } from "react";

const Protected = ({ children }: PropsWithChildren) => {
    const { isLoading, isLoggedIn } = useAuth();

    if (isLoading) {
        return <PageLoadingCard />;
    }

    if (!isLoading && !isLoggedIn) {
        return <ForbiddenCard />;
    }

    return children;
};

export default Protected;
