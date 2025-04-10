import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const spinnerVarients = cva("relative rounded-full animate-spin duration-700", {
    variants: {
        variant: {
            default: "border-blue-100 border-t-blue-600",
            white: "border-white/25 border-t-white",
        },
        size: {
            default: "size-5 border-[3px] border-t-[3px] ",
            large: "size-8 border-[5px] border-t-[5px] ",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});

const Spinner = ({
    size,
    variant,
    className,
}: VariantProps<typeof spinnerVarients> & { className?: string }) => {
    return (
        <div className={cn(spinnerVarients({ variant, size, className }))} />
    );
};

export default Spinner;
