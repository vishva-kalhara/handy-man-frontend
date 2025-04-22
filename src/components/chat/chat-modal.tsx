"use client";
import { MessageSquareText, RefreshCw, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import MiniChat from "./mini-chat";
import { User } from "@/types/user";
import { useGetMyRecipientsQuery } from "@/redux/slices/messages-api-slice";
import Image from "next/image";
import Spinner from "../spinner";

const ChatModal = () => {
    const [isChatSelected, setIsChatSelected] = useState<
        false | Pick<User, "id" | "profileImage" | "displayName" | "avgRating">
    >(false);

    const { data: users, isLoading, refetch } = useGetMyRecipientsQuery();

    const handleRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error("Error refreshing notifications:", error);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"dark"} className="relative">
                    <MessageSquareText size={5} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <div className="flex flex-col">
                    <div className="border-b p-4 flex justify-between items-center">
                        <h4 className="font-semibold text-lg px-2">Messages</h4>
                        {!isChatSelected && (
                            <Button
                                variant={"outline"}
                                size={"sm"}
                                onClick={handleRefresh}
                            >
                                <RefreshCw className="size-3" /> Refresh
                            </Button>
                        )}
                    </div>
                    {!isChatSelected ? (
                        <div
                            className="max-h-[60vh] h-full min-h-[40vh] overflow-y-auto p-2 scrollbar-none "
                            style={{
                                scrollbarWidth: "none",
                                msOverflowStyle: "none",
                            }}
                        >
                            <style jsx global>{`
                                .scrollbar-none::-webkit-scrollbar {
                                    display: none;
                                }
                            `}</style>
                            {users && users.length > 0 ? (
                                users.map((u) => (
                                    <Button
                                        key={u.id}
                                        onClick={() => setIsChatSelected(u)}
                                        variant={"ghost"}
                                        className="hover:bg-gray-100 h-16 border border-transparent w-full justify-between items-center"
                                    >
                                        <div className="flex items-center ">
                                            <div className="relative w-10 h-10 rounded-full border-black/10 border-2">
                                                {u.profileImage ? (
                                                    <Image
                                                        alt="img"
                                                        src={u.profileImage}
                                                        fill
                                                        className={`rounded-full object-cover`}
                                                        sizes="100vw"
                                                    />
                                                ) : (
                                                    <div className="absolute flex justify-center items-center inset-0 w-10 h-10 rounded-full bg-gray-200">
                                                        <span className="text-4xl font-bold text-gray-500">
                                                            {u.displayName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-left text-base font-semibold text-gray-800 ml-2">
                                                {u.displayName}
                                            </p>
                                        </div>
                                        <div className="h-[28px] flex gap-1 items-center px-2.5 bg-[#1e1e1e] rounded-full">
                                            {u.avgRating ? (
                                                <>
                                                    <Star
                                                        fill="#fff"
                                                        className="size-4"
                                                    />
                                                    <span className="text-xs text-white font-semibold">
                                                        {u.avgRating}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-xs text-white font-semibold">
                                                    N/A
                                                </span>
                                            )}
                                        </div>
                                    </Button>
                                ))
                            ) : (
                                <div className="h-52 flex gap-2 flex-col items-center justify-center">
                                    {isLoading ? (
                                        <div className="w-full flex justify-center -mt-6">
                                            <Spinner size={"large"} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">
                                            No Messages yet.
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-2 bg-[#f4f4f4]">
                            <MiniChat
                                setIsChatSelected={setIsChatSelected}
                                isChatSelected={isChatSelected}
                            />
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ChatModal;
