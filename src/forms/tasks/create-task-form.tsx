"use client";
import FormButton from "@/components/form-button";
import FormSwitch from "@/components/form-switch";
import FormTextArea from "@/components/form-text-area";
import ImageUpload from "@/components/image-upload";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import SelectField from "@/components/select-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    image: z.custom<File>((file) => file instanceof File && file.size > 0, {
        message: "Image is required!",
    }),
    title: z.string().min(1, "Title is required!"),
    description: z.string().min(1, "Description is required!"),
    maxPrice: z.coerce.number().min(1, "Max Price is required!"),
    isEmergency: z.boolean().default(false),
    category: z
        .string({ required_error: "Category is required!" })
        .min(1, "Category is required!"),
});

export type CreateTaskFormData = z.infer<typeof schema>;

const CreateTaskForm = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue,
        watch,
    } = useForm({ resolver: zodResolver(schema) });

    const submitForm: SubmitHandler<CreateTaskFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(data);
    };

    const selectedFruit = watch("category");
    const isEmergency = watch("isEmergency");

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <ImageUpload
                displayName="Image:"
                error={errors.image?.message}
                onFileChange={(file) =>
                    setValue("image", file!, { shouldValidate: true })
                }
            />
            <InputField
                displayName="Title:"
                error={errors.title?.message}
                register={register}
                name="title"
            />
            <FormTextArea
                displayName="Description:"
                error={errors.description?.message}
                name="description"
                register={register}
            />
            <InputField
                displayName="Max Price (LKR):"
                error={errors.maxPrice?.message}
                register={register}
                name="maxPrice"
                type="number"
            />
            <SelectField
                placeholder="Select a category"
                data={[
                    { id: "1", categoryName: "Category 1" },
                    { id: "2", categoryName: "Category 2" },
                    { id: "3", categoryName: "Category 3" },
                ]}
                displayName="Category:"
                value={selectedFruit}
                onValueChange={(value) =>
                    setValue("category", value, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                    })
                }
                error={errors.category?.message}
            />
            <FormSwitch
                checked={isEmergency!}
                error={errors.isEmergency?.message}
                onCheckedChange={(checked) => setValue("isEmergency", checked)}
                displayName="Mark as urgent"
            />
            <RootError message={errors.root?.message} />
            <FormButton isSubmitting={isSubmitting}>
                Create Task <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default CreateTaskForm;
