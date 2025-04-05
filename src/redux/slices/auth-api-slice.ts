import { RegisterRequestData } from "@/forms/auth/register-form";
import { AuthResponse } from "@/types/auth/auth-response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
    reducerPath: "auth",
    tagTypes: ["auth"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => {
        return {
            createAccount: builder.mutation<
                AuthResponse,
                Omit<RegisterRequestData, "confirmPassword">
            >({
                query: (body) => ({
                    url: "/auth/register",
                    method: "POST",
                    body,
                }),
            }),
        };
    },
});

export const { useCreateAccountMutation } = authApiSlice;
