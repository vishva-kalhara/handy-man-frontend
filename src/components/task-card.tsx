import { Task } from "@/types/task";
import Image from "next/image";
import Link from "next/link";

const TaskCard = ({ task }: { task: Task }) => {
    return (
        <div className="p-2 border border-black/10 w-full bg-white rounded-xl">
            <Link href={`/task/${task.id}`}>
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
            </Link>
            <div className="flex gap-4 mt-4">
                <Link href={`/users/${task.creator.id}`}>
                    <div className="relative w-[56px] h-[56px]  border border-black/10 rounded-lg">
                        {task.creator.profileImage ? (
                            <Image
                                alt="img"
                                src={task.creator.profileImage}
                                fill
                                className="rounded-lg object-cover"
                                sizes="100vw"
                            />
                        ) : (
                            <div className="flex justify-center items-center w-full h-full bg-gray-200 rounded-lg">
                                <span className="text-2xl font-bold text-gray-500">
                                    {task.creator.displayName
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </Link>
                <div className="flex flex-col">
                    <h4 className="font-semibold text-base ">{task.title}</h4>
                    <div className="flex gap-2 items-center">
                        <h4 className="font-semibold text-xl text-[#454547] ">
                            LKR {task.maxPrice}
                        </h4>
                        {task.isEmergency && (
                            <div className="py-0.5 px-1 bg-red-100 border border-red-200 rounded-full">
                                <span>🔥</span>
                            </div>
                        )}
                        <div className="h-[28px] flex items-center px-2 bg-blue-100 border border-blue-200 rounded-full">
                            <span className="text-xs text-blue-500 font-semibold">
                                {task.category.categoryName}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
