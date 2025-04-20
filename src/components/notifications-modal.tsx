"use client";
import { Bell, RefreshCw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import Link from "next/link";
import { useGetMyNotificationsQuery } from "@/redux/slices/notification-api-slice";
import Spinner from "./spinner";

const NotificationModal = () => {
    const {
        data: notifications,
        refetch,
        isLoading,
    } = useGetMyNotificationsQuery();

    const handleRefresh = async () => {
        try {
            await refetch();
        } catch (error) {
            console.error("Error refreshing notifications:", error);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"dark"} className="relative">
                    <Bell size={5} />
                    {notifications &&
                        notifications.filter((n) => n.hasNoted == true).length >
                            0 && (
                            <div className="size-2 bg-red-500 rounded-full absolute top-1.5 right-1.5" />
                        )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <div className="flex flex-col">
                    <div className="border-b p-4 flex justify-between items-center">
                        <h4 className="font-semibold text-lg px-2">
                            Notifications
                        </h4>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            onClick={handleRefresh}
                        >
                            <RefreshCw className="size-3" /> Refresh
                        </Button>
                    </div>
                    <div
                        className="max-h-[60vh] overflow-y-auto pr-1 scrollbar-none"
                        style={{
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                        }}
                    >
                        <style jsx global>{`
                            .scrollbar-none::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {
                            notifications && notifications.length > 0 ? (
                                <div className="p-2 space-y-2">
                                    {[...notifications]
                                        .sort(
                                            (a, b) =>
                                                new Date(b.createAt).getTime() -
                                                new Date(a.createAt).getTime()
                                        )
                                        .map((notification) => (
                                            <Link
                                                key={notification.id}
                                                href={notification.href}
                                            >
                                                <div className="px-4 py-3 w-full flex flex-col relative hover:bg-gray-100 border border-transparent hover:border-gray-100 rounded-sm hover:cursor-pointer">
                                                    <h6 className="font-semibold text-sm ms-3">
                                                        {notification.title}
                                                    </h6>
                                                    <p className="text-sm mt-1 text-muted-foreground ms-3">
                                                        {notification.message}
                                                    </p>
                                                    {notification.hasNoted && (
                                                        <div className="size-2 absolute top-4 left-2.5 bg-red-500 rounded-full" />
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            ) : (
                                <div className="h-52 flex gap-2 flex-col items-center justify-center">
                                    {isLoading ? (
                                        <div className="w-full flex justify-center -mt-6">
                                            <Spinner size={"large"} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground text-sm">
                                            No notifications yet.
                                        </p>
                                    )}
                                </div>
                            )

                            // <div className="h-52 flex flex-col items-center justify-center gap-3">
                            //     <p className="text-muted-foreground text-sm">
                            //         No notifications yet.
                            //     </p>

                            // </div>
                        }
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationModal;
