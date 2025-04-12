"use client";
import { useGetAuthQuery } from "@/redux/slices/auth-api-slice";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const { data, isLoading, isError, refetch, isSuccess } = useGetAuthQuery();

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(
        undefined
    );

    useEffect(() => {
        if (!isLoading && !isError) {
            setIsLoggedIn(data?.id !== undefined);
        } else if (isError) {
            setIsLoggedIn(false);
        }
    }, [isLoading, isError, data]);

    return { isLoggedIn, isLoading, isError, refetch, user: data, isSuccess };
};
