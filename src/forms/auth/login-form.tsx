"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import {
    useGetAuthQuery,
    useLoginMutation,
} from "@/redux/slices/auth-api-slice";
import { ApiErrorResponse } from "@/types/api-error-reponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Email is not valid"),
    password: z.string().min(1, "Password is required"),
});

export type LoginRequestData = z.infer<typeof schema>;

const LoginForm = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setError,
    } = useForm<LoginRequestData>({
        resolver: zodResolver(schema),
        defaultValues: {},
    });

    const router = useRouter();

    const [mutationFn, { data, isSuccess, error, isError }] =
        useLoginMutation();

    const { refetch } = useGetAuthQuery();

    const submitForm: SubmitHandler<LoginRequestData> = async (data) => {
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
                await refetch(); // 👈 force refetch after token is stored
                router.push("/"); // 👈 navigate after refetch
            }, 50);
        }
    }, [data, isSuccess, refetch, router]);

    return (
        <form onSubmit={handleSubmit(submitForm)}>
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
            <RootError message={errors.root?.message} />
            <FormButton isSubmitting={isSubmitting}>
                Sign In <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default LoginForm;
