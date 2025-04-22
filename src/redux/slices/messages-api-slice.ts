import { Message } from "@/types/message";
import { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApiSlice = createApi({
    reducerPath: "messages",
    tagTypes: ["messages", "my-recipients"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
    }),
    endpoints(build) {
        return {
            sendMessage: build.mutation<
                Message,
                Pick<Message, "message" | "messageType"> & {
                    recipientId: string;
                }
            >({
                query: ({ message, messageType, recipientId }) => ({
                    url: `/messages`,
                    method: "POST",
                    body: {
                        message,
                        messageType: messageType ? messageType : undefined,
                        recipientId,
                    },
                    headers: {
                        authorization:
                            `Bearer ${localStorage.getItem("token")}` || "",
                    },
                }),
                invalidatesTags: ["messages"],
            }),
            getMessagesByRecipientId: build.query<
                Omit<Message, "sender" | "recipient">[],
                string
            >({
                query: (recipientId) => ({
                    url: `/messages/by-recipient/${recipientId}`,
                    method: "GET",
                    headers: {
                        authorization:
                            `Bearer ${localStorage.getItem("token")}` || "",
                    },
                }),
                providesTags: ["messages"],
            }),
            getMyRecipients: build.query<
                Pick<
                    User,
                    "id" | "displayName" | "profileImage" | "avgRating"
                >[],
                void
            >({
                query: () => ({
                    url: `/messages/my-recipients`,
                    method: "GET",
                    headers: {
                        authorization:
                            `Bearer ${localStorage.getItem("token")}` || "",
                    },
                }),
                providesTags: ["my-recipients"],
            }),
        };
    },
});

export const {
    useSendMessageMutation,
    useGetMessagesByRecipientIdQuery,
    useGetMyRecipientsQuery,
} = messagesApiSlice;
