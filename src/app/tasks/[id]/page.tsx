import { Button } from "@/components/ui/button";
import CreateBidForm from "@/forms/bids/create-bid-form";
import { bids } from "@/test-data/bids";
import { tasks } from "@/test-data/tasks";
import { ArrowLeft, CircleX, MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
    const task = tasks[0];

    return (
        <div className="gap-6 flex flex-col sm:flex-row w-full md:max-w-5xl mx-auto">
            <div className="flex-1 flex flex-col  bg-white p-3 border border-black/15 rounded-2xl">
                <div className="flex justify-between mb-3">
                    <Button variant={"light"}>
                        <ArrowLeft size={5} /> Back
                    </Button>
                    <div className="flex gap-2 items-center">
                        {task.isEmergency && (
                            <div className="py-0.5 px-1 bg-red-50 border border-red-200 rounded-full">
                                <span>🔥</span>
                            </div>
                        )}
                        <div className="h-[28px] flex items-center px-2 bg-blue-50 border border-blue-200 rounded-full">
                            <span className="text-xs text-blue-500 font-semibold">
                                {task.category.categoryName}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[400px] rounded-lg border-black/10 border overflow-hidden">
                    <Image
                        alt="img"
                        src={task.image}
                        fill
                        className={`rounded-lg object-cover ${
                            task.taskStatus != "PENDING" && "filter grayscale"
                        }`}
                        sizes="100vw"
                    />
                </div>
                <div className="p-4 flex flex-col mt-2">
                    <h2 className="font-semibold text-lg ">{task.title}</h2>
                    <p className="text-base text-black/60 mt-2">
                        {task.description}
                    </p>
                    <p className="mt-5">
                        <span className="font-bold text-3xl text-[#1e1e1e] ">
                            LKR {task.maxPrice}
                        </span>
                    </p>
                </div>
            </div>
            <div className="sm:max-w-2/5 w-full flex flex-col gap-6">
                <div className="flex bg-white hover:cursor-pointer pt-16 pb-10 px-10 border-[1.5px] transition-all duration-300 border-black/15 hover:border-blue-600 rounded-xl relative flex-col">
                    <Link href={`/users/${task.creator.id}`}>
                        <div className="relative w-full flex justify-center">
                            <div className="relative w-[150px] h-[150px] rounded-full border-black/10 border-2">
                                <Image
                                    alt="img"
                                    src={task.creator.profileImage!}
                                    fill
                                    className={`rounded-full object-cover ${
                                        task.taskStatus != "PENDING" &&
                                        "filter grayscale"
                                    }`}
                                    sizes="100vw"
                                />
                                <div className="absolute bottom-0 right-0 h-[28px] flex gap-1 items-center px-2.5 bg-[#1e1e1e] rounded-full">
                                    <Star fill="#fff" className="size-4" />
                                    <span className="text-xs text-white font-semibold">
                                        4.4
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h4 className="text-xl text-black/80 font-semibold text-center mt-6">
                            {task.creator.displayName}
                        </h4>
                    </Link>
                    <Button
                        variant={"light"}
                        className="absolute top-4 right-4"
                    >
                        <MessageSquare fill="#454545" size={5} /> Message
                    </Button>
                </div>
                <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
                    <h4 className="font-semibold text-base">Make an Offer</h4>
                    <p className="text-black/60 mt-2 text-sm mb-6">
                        Competitive offers within the poster&apos;s budget range
                        get noticed faster!
                    </p>
                    <CreateBidForm />
                </div>
                <div className="flex bg-white p-6 border border-black/15 rounded-xl relative flex-col">
                    <h4 className="font-semibold text-base">Previous Offers</h4>
                    <p className="text-black/60 mt-2 text-sm mb-4">
                        Study the competition. These bids didn&apos;t make the
                        cut &#8211; make yours stand out!
                    </p>
                    {bids.map((bid) => (
                        <div
                            key={"bid" + bid.id}
                            className="w-full py-2 flex gap-2 items-center"
                        >
                            <CircleX
                                fill="oklch(70.4% 0.191 22.216)"
                                stroke="white"
                                className="size-8"
                            />
                            <span className="text-base text-black/60 font-medium">
                                Rejected (LKR {bid.price})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
