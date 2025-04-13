import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const DetailedTaskCard = ({ task }: { task: Task }) => {
    return (
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
                        {new Intl.NumberFormat("en-LK", {
                            style: "currency",
                            currency: "LKR",
                            maximumFractionDigits: 0,
                        }).format(task.maxPrice)}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default DetailedTaskCard;
