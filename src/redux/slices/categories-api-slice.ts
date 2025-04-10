import { Category } from "@/types/category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApiSlice = createApi({
    reducerPath: "categories",
    tagTypes: ["categories"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => {
        return {
            getCategories: builder.query<Category[], null>({
                query: () => "/categories",
                providesTags: ["categories"],
            }),
            createCategory: builder.mutation<Category, Omit<Category, "id">>({
                query: (category) => ({
                    url: "/categories",
                    method: "POST",
                    body: category,
                }),
                invalidatesTags: ["categories"],
            }),
        };
    },
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
    categoriesApiSlice;
