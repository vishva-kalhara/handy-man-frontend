"use client";
import { Button } from "@/components/ui/button";
import {
    useCreateCategoryMutation,
    useGetCategoriesQuery,
} from "@/redux/slices/categories-api-slice";
import { Category } from "@/types/category";
import { useEffect } from "react";

const Page = () => {
    const { data: categories } = useGetCategoriesQuery();

    const [createCategory, { data, isError }] = useCreateCategoryMutation();

    useEffect(() => {
        console.log(data);
    }, [data, isError]);

    return (
        <div>
            {categories?.map((cat: Category) => (
                <Button key={cat.id}>{cat.categoryName}</Button>
            ))}
            <Button
                onClick={() => createCategory({ categoryName: "Gardening" })}
                variant={"outline"}
            >
                Create
            </Button>
        </div>
    );
};

export default Page;
