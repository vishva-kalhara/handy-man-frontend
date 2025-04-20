"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();

    return (
        <Button variant={"light"} onClick={() => router.back()}>
            <ArrowLeft size={5} /> Back
        </Button>
    );
};

export default BackButton;
