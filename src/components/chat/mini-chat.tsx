"use client";
import { User } from "@/types/user";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { RefreshCw, X } from "lucide-react";
import SendMessageForm from "@/forms/messages/send-message-form";
import { useGetMessagesByRecipientIdQuery } from "@/redux/slices/messages-api-slice";
import ChatItem from "./chat-item";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
    isChatSelected: Pick<User, "id" | "profileImage" | "displayName">;
    setIsChatSelected:
        | Dispatch<
              SetStateAction<
                  | false
                  | Pick<
                        User,
                        "id" | "profileImage" | "displayName" | "avgRating"
                    >
              >
          >
        | Dispatch<SetStateAction<boolean>>;
};

const MiniChat = ({ isChatSelected, setIsChatSelected }: Props) => {
    const { data: messages, refetch } = useGetMessagesByRecipientIdQuery(
        isChatSelected.id
    );

    const [isRefetching, setIsRefetching] = useState(false);

    return (
        <>
            <div className="w-full p-4 items-center rounded-t-md flex justify-between border-b bg-white border-b-black/15">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full border-black/10 border-2">
                        {isChatSelected.profileImage ? (
                            <Image
                                alt="img"
                                src={isChatSelected.profileImage}
                                fill
                                className={`rounded-full object-cover`}
                                sizes="100vw"
                            />
                        ) : (
                            <div className="absolute flex justify-center items-center inset-0 w-10 h-10 rounded-full bg-gray-200">
                                <span className="text-4xl font-bold text-gray-500">
                                    {isChatSelected.displayName
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>{" "}
                    <h4 className="text-lg font-semibold">
                        {isChatSelected.displayName}
                    </h4>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="size-10"
                        variant={"outline"}
                        onClick={async () => {
                            setIsRefetching(true);
                            await refetch();
                            setTimeout(() => {
                                setIsRefetching(false);
                            }, 1000);
                        }}
                    >
                        <RefreshCw
                            className={cn(
                                "size-4",
                                isRefetching && "animate-spin"
                            )}
                        />
                    </Button>
                    <Button
                        className="size-10"
                        variant={"outline"}
                        onClick={() => setIsChatSelected(false)}
                    >
                        <X className="size-4" />
                    </Button>
                </div>
            </div>
            <div className="h-full overflow-y-scroll bg-white max-h-[50vh] flex flex-col gap-2 p-4">
                {messages && messages.length > 0 ? (
                    messages.map((m) => <ChatItem key={m.id} message={m} />)
                ) : (
                    <></>
                )}
            </div>
            <SendMessageForm
                recipientId={isChatSelected.id}
                refetch={refetch}
            />
        </>
    );
};

export default MiniChat;
