import { User } from "./user";

export type Message = {
    id: string;
    message: string;
    sentAt: Date;
    sender: User;
    recipient: User;
    messageType: "TEXT" | "TASK";
    isSentByMe: boolean;
};
