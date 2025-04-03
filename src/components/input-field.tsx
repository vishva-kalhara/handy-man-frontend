import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    placeholder?: string;
    error: undefined | string;
    name: Path<T>;
    type?: HTMLInputTypeAttribute | undefined;
    register: UseFormRegister<T>;
}

const InputField = <T extends FieldValues>({
    displayName,
    name,
    register,
    type = "text",
    placeholder,
    error,
    ...props
}: Props<T>) => {
    return (
        <div className="mb-6" {...props}>
            <Label>{displayName}</Label>
            <Input
                type={type}
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
