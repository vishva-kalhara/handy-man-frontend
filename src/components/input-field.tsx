import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLAttributes } from "react";
import {
    FieldError,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    placeholder?: string;
    error: undefined | FieldError;
    name: Path<T>;
    register: UseFormRegister<T>;
}

const InputField = <T extends FieldValues>({
    displayName,
    name,
    register,
    placeholder,
    error,
    ...props
}: Props<T>) => {
    return (
        <div className="mb-6" {...props}>
            <Label>{displayName}</Label>
            <Input
                type="email"
                placeholder={placeholder}
                {...register(name)}
                className="mt-2"
            />
            {error && (
                <Label className="text-red-500 text-sm mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default InputField;
