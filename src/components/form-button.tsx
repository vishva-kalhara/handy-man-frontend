import { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import Spinner from "./spinner";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
    testId?: string;
}

const FormButton = ({
    isSubmitting,
    children,
    testId,
    className,
    ...props
}: Props) => {
    return (
        <div className="flex justify-center">
            <Button
                data-testid={testId || ""}
                type="submit"
                disabled={isSubmitting}
                {...props}
                className={cn(
                    "py-6 mt-2 disabled:opacity-90 text-white",
                    isSubmitting ? "w-1/2 rounded-full" : "w-full",
                    className
                )}
            >
                {isSubmitting ? <Spinner variant={"white"} /> : children}
            </Button>
        </div>
    );
};

export default FormButton;
