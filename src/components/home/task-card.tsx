import { Task } from "@/types/task";
import Image from "next/image";
import Link from "next/link";

const TaskCard = ({ task }: { task: Task }) => {
    return (
        <Link href={`/tasks/${task.id}`}>
            <div className="p-2 border border-black/10 w-full bg-white rounded-xl">
                <div className="relative w-full h-[300px] rounded-lg border-black/10 border overflow-hidden">
                    <Image
                        alt="img"
                        src={task.image}
                        fill
                        className={`rounded-lg object-cover ${
                            task.taskStatus != "PENDING" && "filter grayscale"
                        }`}
                        sizes="100vw"
                    />
                    {task.taskStatus != "PENDING" && (
                        <div className="absolute top-0 flex px-20">
                            <div className="py-2 px-4 bg-white rounded-b-2xl max-w-[250px] mx-auto">
                                <h4 className="text-xl font-semibold text-black text-center">
                                    Task is no longer available.
                                </h4>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <h4 className="font-semibold text-base text-black/70 text-center">
                        {task.title}
                    </h4>
                    <h4 className="font-semibold text-sm text-[#454547] text-center">
                        {new Intl.NumberFormat("en-LK", {
                            style: "currency",
                            currency: "LKR",
                            maximumFractionDigits: 0,
                        }).format(task.maxPrice)}
                    </h4>
                    <div className="flex gap-2 items-center justify-center">
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
            </div>
        </Link>
    );
};

export default TaskCard;
