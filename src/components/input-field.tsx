import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    placeholder?: string;
    testId?: string;
    error: undefined | string;
    name: Path<T>;
    hasDisplayName?: boolean;
    type?: HTMLInputTypeAttribute | undefined;
    register: UseFormRegister<T>;
}

const InputField = <T extends FieldValues>({
    displayName,
    name,
    hasDisplayName = true,
    register,
    type = "text",
    placeholder,
    testId,
    error,
    ...props
}: Props<T>) => {
    return (
        <div className="mb-6" {...props}>
            {hasDisplayName && <Label>{displayName}</Label>}
            <Input
                data-testid={testId || ""}
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className="mt-2"
            />
            {error && (
                <Label
                    data-testid={`${testId}_err`}
                    className="text-red-500 text-sm mt-1"
                >
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default InputField;
