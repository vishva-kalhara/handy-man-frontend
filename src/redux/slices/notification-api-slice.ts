import { Notification } from "@/types/notification";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApiSlice = createApi({
    reducerPath: "notifications",
    tagTypes: ["Notifications"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
    }),
    endpoints: (builder) => {
        return {
            getMyNotifications: builder.query<Notification[], void>({
                query: () => ({
                    url: "/notifications/me",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("token") || ""
                        }`,
                    },
                }),
                providesTags: ["Notifications"],
            }),
        };
    },
});

export const { useGetMyNotificationsQuery } = notificationApiSlice;
