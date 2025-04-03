"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    email: z.string().min(1, "Email is required").email("Email is not valid"),
    password: z.string().min(1, "Password is required"),
});

type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<FormFields>({ resolver: zodResolver(schema) });

    const submitForm: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log(data);
    };

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
                displayName="Password"
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
