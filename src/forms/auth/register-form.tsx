"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import {
    useCreateAccountMutation,
    useGetAuthQuery,
} from "@/redux/slices/auth-api-slice";
import { ApiErrorResponse } from "@/types/api-error-reponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
    .object({
        displayName: z.string().min(1, "Display Name is required"),
        email: z
            .string()
            .min(1, "Email is required")
            .email("Email is not valid"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Confirm Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterRequestData = z.infer<typeof schema>;

const RegisterForm = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
    } = useForm<RegisterRequestData>({
        resolver: zodResolver(schema),
    });

    const router = useRouter();

    const [mutationFn, { isSuccess, error, data, isError }] =
        useCreateAccountMutation();

    const { refetch: refetchAuth } = useGetAuthQuery();

    const submitForm: SubmitHandler<RegisterRequestData> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await mutationFn(data);
        } catch (err) {
            console.error("Unexpected error in mutation:", err);
        }
    };

    useEffect(() => {
        if (isError) {
            const err = error as ApiErrorResponse;
            setError("root", {
                message: err.data.message,
            });
            console.error(err);
        }
    }, [error, isError, setError]);

    useEffect(() => {
        if (data?.token) {
            console.log("Login successful:", data);
            localStorage.setItem("token", data?.token);
            setTimeout(async () => {
                router.push("/");
                await refetchAuth();
            }, 200);
        }
    }, [data, isSuccess, refetchAuth, router]);

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <InputField
                displayName="Display Name:"
                error={errors.displayName?.message}
                register={register}
                placeholder="John Doe"
                name="displayName"
            />
            <InputField
                displayName="Email:"
                error={errors.email?.message}
                register={register}
                type="email"
                placeholder="test@example.com"
                name="email"
            />
            <InputField
                displayName="Password:"
                error={errors.password?.message}
                register={register}
                name="password"
                type="password"
            />
            <InputField
                displayName="Confirm Password:"
                error={errors.confirmPassword?.message}
                register={register}
                name="confirmPassword"
                type="password"
            />
            <RootError message={errors.root?.message} />
            <FormButton isSubmitting={isSubmitting}>
                Create Account <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default RegisterForm;
