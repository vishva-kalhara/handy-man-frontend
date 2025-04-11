import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "users",
    tagTypes: ["users", "me"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: () => {
        return {
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
