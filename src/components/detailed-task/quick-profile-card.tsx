import { MessageSquare, Star } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types/user";

const QuickProfileCard = ({
    user,
}: {
    user: Pick<User, "id" | "profileImage" | "displayName" | "avgRating">;
}) => {
    return (
        <div className="flex bg-white hover:cursor-pointer pt-16 pb-10 px-10 border-[1.5px] transition-all duration-300 border-black/15 hover:border-blue-600 rounded-xl relative flex-col">
            <Link href={`/users/${user.id}`}>
                <div className="relative w-full flex justify-center">
                    <div className="relative w-[150px] h-[150px] rounded-full border-black/10 border-2">
                        {user.profileImage ? (
                            <Image
                                alt="img"
                                src={user.profileImage}
                                fill
                                className={`rounded-full object-cover`}
                                sizes="100vw"
                            />
                        ) : (
                            <div className="absolute flex justify-center items-center inset-0 w-[150px] h-[150px] rounded-full bg-gray-200">
                                <span className="text-4xl font-bold text-gray-500">
                                    {user.displayName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div className="absolute bottom-0 right-0 h-[28px] flex gap-1 items-center px-2.5 bg-[#1e1e1e] rounded-full">
                            {user.avgRating ? (
                                <>
                                    <Star fill="#fff" className="size-4" />
                                    <span className="text-xs text-white font-semibold">
                                        {user.avgRating}
                                    </span>
                                </>
                            ) : (
                                <span className="text-xs text-white font-semibold">
                                    N/A
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <h4 className="text-xl text-black/80 font-semibold text-center mt-6">
                    {user.displayName}
                </h4>
            </Link>
            <Button variant={"light"} className="absolute top-4 right-4">
                <MessageSquare fill="#454545" size={5} /> Message
            </Button>
        </div>
    );
};

export default QuickProfileCard;
