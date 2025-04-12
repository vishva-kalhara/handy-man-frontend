"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SelectFieldProps extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    placeholder: string;
    value?: string;
    onValueChange: (value: string) => void;
    error?: string;
    data: { id: string; categoryName: string }[] | undefined;
    valueSource?: "id" | "value";
}

const SelectField: React.FC<SelectFieldProps> = ({
    displayName,
    placeholder,
    data,
    valueSource = "id",
    className,
    value,
    onValueChange,
    error,
}) => {
    return (
        <div className={cn("mb-6 flex flex-col", className)}>
            <Label className="mb-2">{displayName}</Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger id="fruit-select" className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="max-h-80 overflow-auto">
                    <SelectGroup>
                        {data?.length ? (
                            [...data]
                                .sort((a, b) =>
                                    a.categoryName.localeCompare(b.categoryName)
                                )
                                .map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={
                                            valueSource == "id"
                                                ? item.id
                                                : item.categoryName
                                        }
                                    >
                                        {item.categoryName}
                                    </SelectItem>
                                ))
                        ) : (
                            <SelectItem key={"no items"} value={"no items"}>
                                Loading...
                            </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {error && (
                <Label className="text-sm text-red-500 mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default SelectField;
