import { AddReviewFormType } from "@/forms/reviews/add-review-form";
import { Review } from "@/types/review";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApiSlice = createApi({
    reducerPath: "reviews",
    tagTypes: ["reviews"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
    }),
    endpoints: (builder) => ({
        addReview: builder.mutation<Review, AddReviewFormType>({
            query: (body) => ({
                url: "/reviews",
                method: "POST",
                body,
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem("token") || ""
                    }`,
                },
            }),
            invalidatesTags: ["reviews"],
        }),
        getUserReviews: builder.query<
            Review[],
            { userId: string; isDesc: boolean }
        >({
            query: ({ userId, isDesc = true }) => ({
                url: `/reviews/user/${userId}?isDesc=${isDesc}`,
                method: "GET",
            }),
            providesTags: ["reviews"],
        }),
    }),
});

export const { useAddReviewMutation, useGetUserReviewsQuery } = reviewApiSlice;
