import { AddReviewFormType } from "@/forms/reviews/add-review-form";
import { Review } from "@/types/review";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApiSlice = createApi({
    reducerPath: "reviews",
    tagTypes: ["reviews"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
    }),
});

export const { useAddReviewMutation } = reviewApiSlice;
