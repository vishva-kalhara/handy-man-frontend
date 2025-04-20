import { Bid } from "@/types/bid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bidsApiSlice = createApi({
    reducerPath: "Bids",
    tagTypes: ["Bids"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
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
            updateBidStatus: builder.mutation<
                Bid,
                { bidId: string; bidStatus: "ACCEPTED" | "REJECTED" }
            >({
                query: ({ bidId, bidStatus }) => ({
                    url: `/bids/${bidId}`,
                    method: "PATCH",
                    body: { bidStatus },
                    headers: {
                        Authorization: `Bearer ${
                            localStorage.getItem("token") || ""
                        }`,
                    },
                }),
                invalidatesTags: ["Bids"],
            }),
        };
    },
});

export const { useCreateBidMutation, useUpdateBidStatusMutation } =
    bidsApiSlice;
