"use client";
import FormButton from "@/components/form-button";
import InputField from "@/components/input-field";
import RootError from "@/components/root-error";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<FormFields>();

    const submitForm: SubmitHandler<FormFields> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <InputField
                displayName="Email:"
                error={errors.email}
                register={register}
                name="email"
            />
            <InputField
                displayName="Password"
                error={errors.password}
                register={register}
                name="password"
            />
            <RootError message={errors.root?.message} />
            <FormButton isSubmitting={isSubmitting}>
                Sign In <ArrowRight size={5} />
            </FormButton>
        </form>
    );
};

export default LoginForm;
