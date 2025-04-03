import { HTMLAttributes } from "react";
import { Button } from "./ui/button";
import Spinner from "./spinner";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
}

const FormButton = ({ isSubmitting, children, ...props }: Props) => {
    return (
        <Button
            type="submit"
            disabled={isSubmitting}
            {...props}
            className="w-full py-6 mt-2 disabled:opacity-90"
        >
            {isSubmitting ? <Spinner /> : children}
        </Button>
    );
};

export default FormButton;
