import { HTMLAttributes, useState } from "react";
import FormButton from "./form-button";
import { cn } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
    isSubmitting: boolean;
    waitingLength?: number;
    handleSubmit: () => void;
}

const StageButton = ({
    handleSubmit,
    isSubmitting,
    className,
    waitingLength = 5,
    children,
    ...props
}: Props) => {
    const [currState, setCurrState] = useState<
        "INITIAL" | "COUNTING" | "EXECUTABLE"
    >("INITIAL");
    const [count, setCount] = useState(waitingLength);

    const startCounting = () => {
        setCurrState("COUNTING");
        for (let i = waitingLength; i >= 0; i--) {
            setTimeout(() => {
                setCount(i);
                if (i === 0) {
                    setCurrState("EXECUTABLE");
                }
            }, (waitingLength - i) * 1000);
        }
    };

    const handlebuttonClick = () => {
        if (currState == "INITIAL") {
            startCounting();
        } else if (currState == "EXECUTABLE") {
            handleSubmit();
        }
    };

    return (
        <FormButton
            className={cn(
                currState == "COUNTING" &&
                    "hover:shadow-none shadow-none opacity-75 hover:opacity-75",
                className
            )}
            isSubmitting={isSubmitting}
            onClick={handlebuttonClick}
            {...props}
        >
            {currState == "EXECUTABLE" && "Confirm "}{" "}
            {currState != "COUNTING" && children}{" "}
            {currState == "COUNTING" && `Confirm in ${count}s`}
        </FormButton>
    );
};

export default StageButton;
