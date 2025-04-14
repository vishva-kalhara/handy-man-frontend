"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
    maxRating?: number;
}

export function StarRating({
    rating,
    onRatingChange,
    maxRating = 5,
}: StarRatingProps) {
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    return (
        <div className="flex items-center space-x-1">
            {Array.from({ length: maxRating }, (_, i) => i + 1).map((star) => (
                <Star
                    key={star}
                    className={cn(
                        "h-8 w-8 cursor-pointer transition-all",
                        (hoveredRating !== null && star <= hoveredRating) ||
                            (hoveredRating === null && star <= rating)
                            ? "fill-primary text-primary"
                            : "fill-muted text-muted-foreground"
                    )}
                    onClick={() => onRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                />
            ))}
        </div>
    );
}
