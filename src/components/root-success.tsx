import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    message: string;
}

const RootSuccess = ({ message, ...props }: Props) => {
    return (
        <p
            {...props}
            className="text-green-700 mt-2 bg-green-100 rounded-sm py-2 px-2 text-center border border-green-300 text-sm"
        >
            {message}
        </p>
    );
};

export default RootSuccess;
