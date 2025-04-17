"use client";
import DetailedUserBase from "@/components/detailed-user/detailed-user-base";
import { useAuth } from "@/hooks/use-auth";

const Page = () => {
    const { user } = useAuth();

    return <DetailedUserBase isLoggedInUser={true} userId={user!.id} />;
};

export default Page;
