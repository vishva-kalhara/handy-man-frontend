"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClearFiltersCard = () => {
    const [hasClearFilters, setHasClearFilters] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const sortBy = searchParams.get("sortBy");
        const sortDir = searchParams.get("sortDir");

        // Convert searchParams to a plain object
        const allParams = Array.from(searchParams.entries());
        const otherParams = allParams.filter(
            ([key]) => key !== "sortBy" && key !== "sortDir"
        );

        if (
            sortBy === "createdAt" &&
            sortDir === "desc" &&
            otherParams.length > 0
        ) {
            setHasClearFilters(true);
        } else if (sortBy !== "createdAt" || sortDir !== "desc") {
            setHasClearFilters(true);
        } else {
            setHasClearFilters(false);
        }
    }, [searchParams]);

    const handleClearFilters = () => {
        window.location.reload();
    };

    if (!hasClearFilters) return null;

    return (
        <div className="w-full justify-end flex mb-2">
            <Button
                size="sm"
                className="bg-white!"
                variant="outline"
                type="button"
                onClick={handleClearFilters}
            >
                <FilterX className="size-3" /> Clear Filters
            </Button>
        </div>
    );
};

export default ClearFiltersCard;
