import { User } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
    reducerPath: "users",
    tagTypes: ["users", "me"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
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
            updateMyBio: builder.mutation<null, string>({
                query: (bio) => ({
                    url: `/users/me/bio`,
                    method: "PATCH",
                    body: { bio },
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("token") || ""
                        }`,
                    },
                }),
            }),
            updateMyPicture: builder.mutation<null, FormData>({
                query: (formData) => ({
                    url: `/users/me/my-img`,
                    method: "PATCH",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("token") || ""
                        }`,
                    },
                }),
            }),
        };
    },
});

export const {
    useGetUserQuery,
    useUpdateMyBioMutation,
    useUpdateMyPictureMutation,
} = userApiSlice;
