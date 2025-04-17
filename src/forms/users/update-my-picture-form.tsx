"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useUpdateMyPictureMutation } from "@/redux/slices/user-api-slice";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const UpdateMyPictureForm = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [updateFn] = useUpdateMyPictureMutation();

    const { refetch: refetchUser, user } = useAuth();

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);
            await updateFn(formData);
            await refetchUser();
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            window.location.reload();
        }
    };

    return (
        <div className="flex flex-col">
            <Label>Profile Picture:</Label>
            <div className="flex items-end mt-2 mb-6 gap-4">
                <div className="relative w-[150px] h-[150px] rounded-lg border-black/10 border-2">
                    {user!.profileImage ? (
                        <Image
                            alt="img"
                            src={user!.profileImage}
                            fill
                            className={`rounded-lg object-cover`}
                            sizes="100vw"
                        />
                    ) : (
                        <div className="absolute flex justify-center items-center inset-0 w-[150px] h-[150px] rounded-lg bg-gray-200">
                            <span className="text-4xl font-bold text-gray-500">
                                {user!.displayName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>
                <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={handleButtonClick}
                >
                    <Edit className="size-4" />
                    Update
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};

export default UpdateMyPictureForm;
