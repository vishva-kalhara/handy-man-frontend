import { Label } from "@/components/ui/label";
import { HTMLAttributes } from "react";
import { Switch } from "./ui/switch";

interface Props extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    error: undefined | string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

const FormSwitch = ({
    displayName,
    checked,
    onCheckedChange,
    error,
    ...props
}: Props) => {
    return (
        <div className="mb-6" {...props}>
            <div className="flex items-center space-x-2">
                <Switch
                    id={displayName}
                    checked={checked || false}
                    onCheckedChange={onCheckedChange}
                />
                <Label htmlFor={displayName}>{displayName}</Label>
            </div>

            {error && (
                <Label className="text-red-500 text-sm mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default FormSwitch;
