"use client";
import RootError from "@/components/root-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSendMessageMutation } from "@/redux/slices/messages-api-slice";
import { ApiErrorResponse } from "@/types/api-error-reponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    message: z.string(),
});

export type SendMessageFormType = z.infer<typeof schema>;

const SendMessageForm = ({ recipientId }: { recipientId: string }) => {
    const [isText, setIsText] = useState(true);

    const url = usePathname();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<SendMessageFormType>({
        resolver: zodResolver(schema),
        defaultValues: {
            message: "",
        },
    });

    const [sendFn, { isLoading, isSuccess, isError, error }] =
        useSendMessageMutation();

    useEffect(() => {
        if (isError) {
            const err = error as ApiErrorResponse;
            setError("root", {
                message: err.data.message,
            });
            console.error(err);
        }
    }, [error, isError, setError]);

    useEffect(() => {
        if (isSuccess) {
            setIsText(true);
            reset();
            // refetch
        }
    }, [isSuccess, reset]);

    const onSubmit: SubmitHandler<SendMessageFormType> = async (data) => {
        try {
            if (isText && !data.message) {
                setError("root", {
                    message: "Message is required!",
                });
                return;
            }

            await sendFn({
                message: isText ? data.message : url,
                messageType: isText ? "TEXT" : "TASK",
                recipientId,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-t bg-white rounded-b-md border-t-black/15 p-4 flex gap-2 items-center">
                <Button
                    type="button"
                    className="size-10"
                    variant={"outline"}
                    onClick={() => setIsText(!isText)}
                >
                    {isText ? (
                        <Link2 className="size-4" />
                    ) : (
                        <X className="size-4" />
                    )}
                </Button>
                {isText ? (
                    <>
                        <Input
                            {...register("message")}
                            className="w-full h-10"
                            placeholder="Type yuor message..."
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="size-10"
                        >
                            <Send className="size-4" />
                        </Button>
                    </>
                ) : (
                    <Button
                        disabled={isLoading}
                        type="submit"
                        className="h-10 flex-1"
                    >
                        Send Task <Send className="size-4" />
                    </Button>
                )}
            </div>
            {errors.root && (
                <div className="p-4 pt-0">
                    <RootError message={errors.root?.message} />
                </div>
            )}
        </form>
    );
};

export default SendMessageForm;
