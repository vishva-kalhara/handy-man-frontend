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

type SelectFieldProps = {
    displayName: string;
    placeholder: string;
    value?: string;
    onValueChange: (value: string) => void;
    error?: string;
    data: { id: string; categoryName: string }[];
};

const SelectField: React.FC<SelectFieldProps> = ({
    displayName,
    placeholder,
    data,
    value,
    onValueChange,
    error,
}) => {
    return (
        <div className="mb-6 flex flex-col">
            <Label className="mb-2">{displayName}</Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger id="fruit-select" className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.categoryName}
                            </SelectItem>
                        ))}
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
