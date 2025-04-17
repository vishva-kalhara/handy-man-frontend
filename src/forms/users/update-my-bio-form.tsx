"use client";
import FormButton from "@/components/form-button";
import FormTextArea from "@/components/form-text-area";
import RootError from "@/components/root-error";
import RootSuccess from "@/components/root-success";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateMyBioMutation } from "@/redux/slices/user-api-slice";
import { ApiErrorResponse } from "@/types/api-error-reponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    bio: z
        .string()
        .min(25, "Bio must be at least 25 characters")
        .max(224, "Bio must be at most 225 characters"),
});

export type updateMyBioRequestData = z.infer<typeof schema>;

const UpdateMyBioForm = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        setError,
        setValue,
    } = useForm<updateMyBioRequestData>({
        resolver: zodResolver(schema),
        defaultValues: {
            bio: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const [updateFn, { isError, isSuccess, error }] = useUpdateMyBioMutation();

    const { user, refetch: refetchUser } = useAuth();

    useEffect(() => {
        setValue("bio", user?.bio || "");
    }, [setValue, user?.bio]);

    useEffect(() => {
        if (isError) {
            const err = error as ApiErrorResponse;
            setError("root", {
                message: err.data.message,
            });
            console.error(err);
        }
    }, [error, isError, setError]);

    const submitFn: SubmitHandler<updateMyBioRequestData> = async (data) => {
        setIsLoading(true);
        try {
            await updateFn(data.bio);
            setTimeout(async () => {
                if (isSuccess) await refetchUser();
                setIsLoading(false);
            }, 1500);
        } catch (err) {
            console.error("Unexpected error in mutation:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitFn)}>
            <FormTextArea
                placeholder="Write your bio here..."
                displayName="Bio:"
                // value={user?.bio || ""}
                error={errors.bio?.message}
                name="bio"
                register={register}
            />
            <RootError message={errors.root?.message} />
            {isSuccess && !isLoading && (
                <RootSuccess message="Profile updated!" />
            )}
            <FormButton isSubmitting={isLoading}>
                Update Profile <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default UpdateMyBioForm;
