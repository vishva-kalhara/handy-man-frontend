import { Bid } from "@/types/bid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bidsApiSlice = createApi({
    reducerPath: "Bids",
    tagTypes: ["Bids"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => {
        return {
            createBid: builder.mutation<Bid, { price: number; taskId: string }>(
                {
                    query: (body) => ({
                        url: "/bids",
                        method: "POST",
                        body,
                        headers: {
                            Authorization: `Bearer ${
                                localStorage.getItem("token") || ""
                            }`,
                        },
                    }),
                    invalidatesTags: ["Bids"],
                }
            ),
        };
    },
});

export const { useCreateBidMutation } = bidsApiSlice;
