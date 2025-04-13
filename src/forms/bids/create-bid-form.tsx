"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import { useAuth } from "@/hooks/use-auth";
import { useCreateBidMutation } from "@/redux/slices/bids-api-slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    biddingPrice: z.coerce.number().min(0.1, "Bidding Price is required!"),
});

export type CreateBidFormData = z.infer<typeof schema>;

const CreateBidForm = ({ taskId }: { taskId: string }) => {
    const { isLoggedIn } = useAuth();

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<CreateBidFormData>({ resolver: zodResolver(schema) });

    const [createFn, { data: resData, isLoading }] = useCreateBidMutation();

    if (!isLoggedIn) {
        return (
            <p className="text-center text-red-500 font-semibold text-base mb-2">
                Please{" "}
                <Link href={"/auth/sign-in"} className="underline">
                    sign in
                </Link>{" "}
                to place a bid.
            </p>
        );
    }

    const onFormSubmit: SubmitHandler<CreateBidFormData> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await createFn({
                price: data.biddingPrice,
                taskId: taskId,
            });
        } catch (error) {
            console.error(error);
        } finally {
            console.log(resData);
            if (!isLoading) window.location.reload();
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <InputField
                hasDisplayName={false}
                className="mb-4"
                displayName="Bidding Price:"
                error={errors.biddingPrice?.message}
                register={register}
                type="number"
                placeholder="Bidding Price in LKR"
                name="biddingPrice"
            />
            <RootError message={errors.root?.message} />
            <FormButton isSubmitting={isSubmitting}>
                Bid Now <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default CreateBidForm;
