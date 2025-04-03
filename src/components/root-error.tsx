import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
    message: string | undefined;
}

const RootError = ({ message, ...props }: Props) => {
    return message ? (
        <p
            {...props}
            className="text-red-600 mt-2 bg-red-100 rounded-sm py-2 px-2 text-center border border-red-300 text-sm"
        >
            {message}
        </p>
    ) : (
        <></>
    );
};

export default RootError;
