import { HTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface Props<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    placeholder?: string;
    error: undefined | string;
    name: Path<T>;
    register: UseFormRegister<T>;
}

const FormTextArea = <T extends FieldValues>({
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
            <Textarea
                {...register(name)}
                placeholder={placeholder}
                className="mt-2"
            />
            {/* <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="mt-2"
        /> */}
            {error && (
                <Label className="text-red-500 text-sm mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default FormTextArea;
