"use client";
import { MessageSquareText, RefreshCw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import MiniChat from "./mini-chat";
import { User } from "@/types/user";

const ChatModal = () => {
    const [isChatSelected, setIsChatSelected] = useState<
        | false
        | Pick<
              User,
              "id" | "profileImage" | "displayName" | "avgRating" | "bio"
          >
    >(false);

    const users: Pick<
        User,
        "id" | "profileImage" | "displayName" | "avgRating" | "bio"
    >[] = [
        {
            id: "1",
            displayName: "John Doe",
            profileImage: null,
            avgRating: 4.5,
            bio: "Experienced handyman with a focus on quality.",
        },
        {
            id: "2",
            displayName: "Jane Smith",
            profileImage: null,
            avgRating: 4.8,
            bio: "Passionate about helping clients with home repairs.",
        },
        {
            id: "3",
            displayName: "Alice Johnson",
            profileImage: null,
            avgRating: 4.2,
            bio: "Skilled in a variety of household tasks.",
        },
        {
            id: "4",
            displayName: "Bob Brown",
            profileImage: null,
            avgRating: 4.0,
            bio: "Reliable and efficient handyman services.",
        },
        {
            id: "5",
            displayName: "Charlie Davis",
            profileImage: null,
            avgRating: 3.9,
            bio: "Dedicated to providing excellent service.",
        },
        {
            id: "6",
            displayName: "Diana Evans",
            profileImage: null,
            avgRating: 4.7,
            bio: "Specialist in home improvement projects.",
        },
        {
            id: "7",
            displayName: "Ethan Foster",
            profileImage: null,
            avgRating: 4.3,
            bio: "Friendly and professional handyman.",
        },
        {
            id: "8",
            displayName: "Fiona Green",
            profileImage: null,
            avgRating: 4.6,
            bio: "Committed to making your home repairs easy.",
        },
        {
            id: "9",
            displayName: "George Harris",
            profileImage: null,
            avgRating: 4.1,
            bio: "Experienced in a wide range of repair tasks.",
        },
        {
            id: "10",
            displayName: "Hannah Ivers",
            profileImage: null,
            avgRating: 4.9,
            bio: "Top-rated handyman with years of experience.",
        },
    ];

    const handleRefresh = async () => {
        try {
            // await refetch();
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
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={handleRefresh}
                        >
                            <RefreshCw className="size-3" /> Refresh
                        </Button>
                    </div>
                    {!isChatSelected ? (
                        <div
                            className="max-h-[60vh] overflow-y-auto p-2 scrollbar-none "
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
                            {users.map((u) => (
                                <Button
                                    key={u.id}
                                    onClick={() => setIsChatSelected(u)}
                                    variant={"ghost"}
                                    className="hover:bg-gray-100 h-10 border border-transparent w-full justify-start"
                                >
                                    {u.displayName}
                                </Button>
                            ))}
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
