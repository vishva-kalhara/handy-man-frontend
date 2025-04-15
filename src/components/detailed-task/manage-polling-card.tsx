import { cn } from "@/lib/utils";
import Spinner from "../spinner";
import { Button } from "../ui/button";
import { useTask } from "@/contexts/detailed-tsx-context";
import { RefreshCw, RefreshCwOff } from "lucide-react";
import { useState } from "react";

const ManagePollingCard = () => {
    const { isPolling, setIsPolling, refetch } = useTask();

    const [isRefetching, setIsRefetching] = useState(false);

    return (
        <div
            className={cn(
                "w-full px-4 py-3 flex justify-between",
                isPolling
                    ? "bg-blue-500 text-white rounded-md"
                    : "bg-gray-500 text-white rounded-md"
            )}
        >
            <div className="flex gap-2 items-center">
                {isPolling ? (
                    <Spinner variant="white" />
                ) : (
                    // <div className="bg-white size-3 rounded-full mx-1 animate-pulse" />
                    <RefreshCwOff className="size-4" />
                )}
                <p className="text-sm font-semibold ml-0.5">
                    {isPolling
                        ? "Syncs Realtime."
                        : "Realtime syncing disabled!"}
                </p>
            </div>
            <div className="flex gap-2">
                <Button
                    className="bg-white/20 text-white border border-white/30 size-8"
                    onClick={async () => {
                        setIsRefetching(true);
                        await refetch();
                        setTimeout(() => {
                            setIsRefetching(false);
                        }, 1000);
                    }}
                >
                    {!isPolling && (
                        <RefreshCw
                            className={cn(
                                "size-4",
                                isRefetching && "animate-spin"
                            )}
                        />
                    )}
                </Button>
                <Button
                    size="sm"
                    className="bg-white/20 text-white border border-white/30"
                    onClick={() => setIsPolling(!isPolling)}
                >
                    {isPolling ? "Disable" : "Enable"}
                </Button>
            </div>
        </div>
    );
};

export default ManagePollingCard;
