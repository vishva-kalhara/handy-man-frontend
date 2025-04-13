"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/input-field";
import SelectField from "@/components/select-field";
import { useGetCategoriesQuery } from "@/redux/slices/categories-api-slice";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const schema = z.object({
    minPrice: z.coerce
        .number()
        .min(0, "Minimum price must be greater than 0")
        .optional(),
    maxPrice: z.coerce
        .number()
        .min(0, "Maximum price must be greater than 0")
        .optional(),
    category: z.string().optional(),
    isEmergency: z.string().optional(),
});

export type FilterTasksFormData = z.infer<typeof schema>;

const FilterForm = () => {
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FilterTasksFormData>({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    const { data: categories } = useGetCategoriesQuery();

    const router = useRouter();
    const searchParams = useSearchParams();

    const submitForm: SubmitHandler<FilterTasksFormData> = (data) => {
        let filteredEntries = Object.entries(data).filter(
            ([, value]) =>
                value !== undefined &&
                value !== "" &&
                value !== null &&
                value !== 0
        );

        filteredEntries = [
            ...filteredEntries,
            ["sortBy", "createdAt"],
            ["sortDir", "desc"],
        ];

        const queryString = new URLSearchParams(
            filteredEntries as [string, string][]
        ).toString();

        router.push(`?${queryString}`);
    };

    useEffect(() => {
        ["minPrice", "maxPrice", "category", "isEmergency"].forEach((key) => {
            const value = searchParams.get(key);
            if (value !== null) {
                if (key === "minPrice" || key === "maxPrice") {
                    setValue(key as keyof FilterTasksFormData, Number(value));
                } else {
                    setValue(key as keyof FilterTasksFormData, value);
                }
            }
        });
    }, [searchParams, setValue]);

    const taskTypes = [
        { id: "false", categoryName: "All" },
        { id: "true", categoryName: "Urgent" },
    ];

    const selectedCategory = watch("category");
    const selectedTaskType = watch("isEmergency");

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="w-full rounded-xl bg-white border border-black/10 p-6 md:pb-0 mb-8 flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
                    <InputField
                        type="number"
                        displayName="Min Price:"
                        placeholder="Pice in LKR"
                        error={errors.minPrice?.message}
                        register={register}
                        name="minPrice"
                    />
                    <InputField
                        type="number"
                        displayName="Max Price:"
                        placeholder="Pice in LKR"
                        error={errors.maxPrice?.message}
                        register={register}
                        name="maxPrice"
                    />
                    <SelectField
                        placeholder="Select a category"
                        valueSource="value"
                        data={categories}
                        displayName="Category:"
                        value={selectedCategory}
                        onValueChange={(value) =>
                            setValue("category", value, {
                                shouldValidate: true,
                                shouldDirty: true,
                                shouldTouch: true,
                            })
                        }
                        error={errors.category?.message}
                    />
                    <div className="flex gap-4 w-full">
                        <SelectField
                            className="w-full"
                            placeholder="Task Type"
                            data={taskTypes}
                            displayName="Task Type:"
                            value={selectedTaskType}
                            onValueChange={(value) =>
                                setValue("isEmergency", value, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                })
                            }
                            error={errors.isEmergency?.message}
                        />
                        <Button
                            type="submit"
                            className="hidden md:flex size-14"
                        >
                            <FilterIcon className="size-5" />
                        </Button>
                    </div>
                </div>
                <div className="md:hidden w-full flex justify-end">
                    <Button type="submit" className="w-full">
                        <FilterIcon className="mr-2" /> Filter
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default FilterForm;
