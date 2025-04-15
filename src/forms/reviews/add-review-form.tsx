"use client";
import FormButton from "@/components/form-button";
import FormStarRating from "@/components/form-elements/form-star-rating";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import { useTask } from "@/contexts/detailed-tsx-context";
import { useAddReviewMutation } from "@/redux/slices/review-api-slice";
import { ApiErrorResponse } from "@/types/api-error-reponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    ratedValue: z.number().min(1, "Required!").max(5),
    reviewText: z
        .string()
        .min(5, {
            message: "Comment must be at least 5 characters.",
        })
        .max(100, {
            message: "Comment must not exceed 100 characters.",
        }),
    reviewedToId: z.string().optional(),
    taskId: z.string().optional(),
});

export type AddReviewFormType = z.infer<typeof schema>;

type Props = {
    reviewedToId: string;
    taskId: string;
};

const AddReviewForm = ({ reviewedToId, taskId }: Props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { refetch } = useTask();

    const [addReviewFn, { isError, error }] = useAddReviewMutation();

    const {
        handleSubmit,
        register,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm<AddReviewFormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            ratedValue: 0,
            reviewText: "",
            reviewedToId,
            taskId,
        },
    });

    const currentRating = watch("ratedValue");

    useEffect(() => {
        if (isError) {
            const err = error as ApiErrorResponse;
            setError("root", {
                message: err.data.message,
            });
            console.error(err);
        }
    }, [error, isError, setError]);

    const submitForm: SubmitHandler<AddReviewFormType> = async (data) => {
        try {
            setIsSubmitting(true);
            await addReviewFn(data);
            setTimeout(async () => {
                setIsSubmitting(false);
                await refetch();
            }, 1500);
        } catch (error) {
            console.error("Unexpected error in mutation:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col mt-3">
                <FormStarRating
                    displayName="Rate:"
                    currentRating={currentRating}
                    setValue={setValue}
                    error={errors.ratedValue?.message}
                />
                <InputField
                    displayName="Comment:"
                    error={errors.reviewText?.message}
                    register={register}
                    type="text"
                    placeholder="Write your comment here..."
                    name="reviewText"
                />
                <RootError message={errors.root?.message} />
                <FormButton isSubmitting={isSubmitting}>
                    Submit Review <ArrowRight size={5} />
                </FormButton>
            </div>
        </form>
    );
};

export default AddReviewForm;
