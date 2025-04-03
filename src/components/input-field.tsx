import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
    displayName: string;
    placeholder?: string;
    error: string;
};

const InputField = ({ displayName, placeholder, error }: Props) => {
    return (
        <div className="mb-6">
            <Label>{displayName}</Label>
            <Input type="email" placeholder={placeholder} className="mt-2" />
            {error && (
                <Label className="text-red-500 text-sm mt-1">{error}</Label>
            )}
        </div>
    );
};

export default InputField;
