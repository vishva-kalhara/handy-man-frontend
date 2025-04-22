import { cn } from "@/lib/utils";
import { Message } from "@/types/message";
import Link from "next/link";

type Props = {
    message: Omit<Message, "sender" | "recipient">;
};

const ChatItem = ({ message: { isSentByMe, message, messageType } }: Props) => {
    return (
        <div
            className={cn(
                "w-full flex",
                isSentByMe ? "justify-end" : "justify-start"
            )}
        >
            <div
                className={cn(
                    "py-2 px-3 rounded-xl max-w-2/3",
                    !isSentByMe
                        ? "bg-[#f4f4f4] text-black/80"
                        : "text-white bg-blue-500"
                )}
            >
                {messageType == "TEXT" ? (
                    <p className="font-medium text-sm">{message}</p>
                ) : (
                    <Link
                        href={message}
                        className="font-medium text-sm underline underline-offset-3"
                    >
                        Check out the Task
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ChatItem;
