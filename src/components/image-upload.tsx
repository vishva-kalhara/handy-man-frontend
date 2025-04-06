"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageIcon, UploadIcon } from "lucide-react";
import Image from "next/image";

type Props = {
    onFileChange: (file: File | null) => void;
    error: undefined | string;
    displayName: string;
};

export default function ImageUpload({
    onFileChange,
    displayName,
    error,
}: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview(null);
            onFileChange(null);
            return;
        }

        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
        onFileChange(file);

        return () => URL.revokeObjectURL(fileUrl);
    };

    const handleButtonClick = () => {
        inputRef.current?.click();
    };

    return (
        <div className="grid w-full max-w-sm items-center mb-6">
            <Label>{displayName}</Label>
            <Input
                ref={inputRef}
                id="picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="flex flex-col gap-2 mt-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border group">
                    {preview ? (
                        <>
                            <Image
                                fill
                                src={preview}
                                alt="Preview"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-200">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={handleButtonClick}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <UploadIcon className="mr-2 h-4 w-4" />
                                    Change Image
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-muted/20 p-4">
                            <ImageIcon className="h-10 w-10 mb-4 text-muted-foreground" />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleButtonClick}
                                className="mt-2"
                            >
                                <UploadIcon className="mr-2 h-4 w-4" />
                                Upload Image
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {error && (
                <Label className="text-red-500 text-sm mt-1">
                    {error.toString()}
                </Label>
            )}
        </div>
    );
}
