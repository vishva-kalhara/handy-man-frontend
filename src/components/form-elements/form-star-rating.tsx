import { UseFormSetValue } from "react-hook-form";
import { StarRating } from "../star-rating";
import { Label } from "../ui/label";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    displayName: string;
    currentRating: number;
    error: undefined | string;
    setValue: UseFormSetValue<{
        ratedValue: number;
        reviewText: string;
    }>;
}

const FormStarRating = ({
    currentRating,
    setValue,
    displayName,
    error,
    ...props
}: Props) => {
    return (
        <div className="mb-6" {...props}>
            <Label className="mb-1">{displayName}</Label>
            <StarRating
                rating={currentRating}
                onRatingChange={(rating) =>
                    setValue("ratedValue", rating, { shouldValidate: true })
                }
            />
            {error && (
                <Label className="text-red-500 text-sm mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
};

export default FormStarRating;
