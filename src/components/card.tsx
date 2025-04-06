"use client";
import { HTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props extends HTMLAttributes<HTMLDivElement> {
    hasBack?: boolean;
    heading: string;
    description?: string;
    children: ReactNode;
    extraNodes?: ReactNode;
}

const Card = ({
    hasBack = true,
    children,
    heading,
    extraNodes,
    description,
    ...props
}: Props) => {
    const router = useRouter();

    return (
        <div
            className="max-w-lg md:max-w-3xl mx-auto rounded-lg p-10 border border-black/15 bg-white flex flex-col md:flex-row gap-6"
            {...props}
        >
            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className=" flex flex-col ">
                    {hasBack && (
                        <div>
                            <Button
                                variant={"light"}
                                onClick={() => router.back()}
                            >
                                <ArrowLeft size={5} /> Back
                            </Button>
                        </div>
                    )}
                    <h1 className="font-semibold text-2xl mt-4">{heading}</h1>
                    <p className="text-sm text-black/50 mt-1">{description}</p>
                </div>
                {extraNodes && <div className="mt-6">{extraNodes}</div>}
            </div>
            <div className="w-full border-t-2 border-t-black/5 md:border-t-0 md:w-1/2 md:border-l-2 border-l-black/5 pt-10 md:pt-0 md:pl-8">
                {children}
            </div>
        </div>
    );
};

export default Card;
