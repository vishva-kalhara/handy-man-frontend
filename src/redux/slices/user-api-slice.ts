import { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "users",
    tagTypes: ["users", "me"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => {
        return {
            getUser: builder.query<User, string>({
                query: (id) => ({
                    url: `/users/${id}`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("token") || ""
                        }`,
                    },
                }),
                providesTags: ["users"],
            }),
            // getMe: builder.query<User | null, null>({
            //     query: () => ({
            //         url: "/users/me",
            //         method: "GET",
            //         headers: {
            //             Authorization: `Bearer ${
            //                 localStorage.getItem("token") || ""
            //             }`,
            //         },
            //     }),
            //     providesTags: ["me"],
            // }),
        };
    },
});

export const { useGetUserQuery } = userApiSlice;
