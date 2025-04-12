"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    biddingPrice: z.coerce.number().min(0.1, "Bidding Price is required!"),
});

export type CreateBidFormData = z.infer<typeof schema>;

const CreateBidForm = () => {
    const { isLoggedIn } = useAuth();

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<CreateBidFormData>({ resolver: zodResolver(schema) });

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
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(data);
        // Invalidate the query key
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
