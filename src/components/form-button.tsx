import { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import Spinner from "./spinner";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
}

const FormButton = ({ isSubmitting, children, ...props }: Props) => {
    return (
        <div className="flex justify-center">
            <Button
                type="submit"
                disabled={isSubmitting}
                {...props}
                className={` py-6 mt-2 disabled:opacity-90 text-white ${
                    isSubmitting ? "w-1/2 rounded-full" : "w-full"
                }`}
            >
                {isSubmitting ? <Spinner /> : children}
            </Button>
        </div>
    );
};

export default FormButton;
