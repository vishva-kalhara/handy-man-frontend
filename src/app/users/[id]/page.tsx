"use client";
import DetailedUserBase from "@/components/detailed-user/detailed-user-base";
import { useParams } from "next/navigation";

const Page = () => {
    const { id } = useParams<{ id: string }>();

    return <DetailedUserBase isLoggedInUser={false} userId={id} />;
};

export default Page;
