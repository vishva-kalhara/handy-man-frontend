import { User } from "@/types/user";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Link2, Send, X } from "lucide-react";
import { Input } from "../ui/input";

type Props = {
    isChatSelected: Pick<
        User,
        "id" | "profileImage" | "displayName" | "avgRating" | "bio"
    >;
    setIsChatSelected:
        | Dispatch<
              SetStateAction<
                  | false
                  | Pick<
                        User,
                        | "id"
                        | "profileImage"
                        | "displayName"
                        | "avgRating"
                        | "bio"
                    >
              >
          >
        | Dispatch<SetStateAction<boolean>>;
};

const MiniChat = ({ isChatSelected, setIsChatSelected }: Props) => {
    return (
        <>
            <div className="w-full p-4 items-center rounded-t-md flex justify-between border-b bg-white border-b-black/15">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full border-black/10 border-2 relative "></div>
                    <h4 className="text-lg font-semibold">
                        {isChatSelected.displayName}
                    </h4>
                </div>
                <Button
                    className="size-10"
                    variant={"outline"}
                    onClick={() => setIsChatSelected(false)}
                >
                    <X className="size-4" />
                </Button>
            </div>
            <div className="h-full overflow-y-scroll bg-white max-h-[50vh] flex flex-col gap-2 p-4">
                <div className="w-full justify-start flex">
                    <div className="bg-[#f4f4f4] py-2 px-3 rounded-xl max-w-2/3">
                        <p className="font-medium text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ab numquam magni quaerat ratione error
                            recusandae libero voluptas necessitatibus facilis
                            magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-end flex">
                    <div className="py-2 px-3 rounded-xl max-w-2/3 text-white bg-blue-500">
                        <p className="font-medium text-sm">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ab numquam magni quaerat ratione error
                            recusandae libero voluptas necessitatibus facilis
                            magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-end flex">
                    <div className="py-2 px-3 rounded-xl max-w-2/3 text-white bg-blue-500">
                        <p className="font-medium text-sm">
                            quaerat ratione error recusandae libero voluptas
                            necessitatibus facilis magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-start flex">
                    <div className="bg-[#f4f4f4] py-2 px-3 rounded-xl max-w-2/3">
                        <p className="font-medium text-sm">
                            libero voluptas necessitatibus facilis magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-end flex">
                    <div className="py-2 px-3 rounded-xl max-w-2/3 text-white bg-blue-500">
                        <p className="font-medium text-sm">
                            quaerat ratione error recusandae libero voluptas
                            necessitatibus facilis magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-start flex">
                    <div className="bg-[#f4f4f4] py-2 px-3 rounded-xl max-w-2/3">
                        <p className="font-medium text-sm">
                            libero voluptas necessitatibus facilis magnam.
                        </p>
                    </div>
                </div>
                <div className="w-full justify-end flex">
                    <div className="py-2 px-3 rounded-xl max-w-2/3 text-white bg-blue-500">
                        <p className="font-medium text-sm">
                            quaerat ratione error recusandae libero voluptas
                            necessitatibus facilis magnam.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-t bg-white rounded-b-md border-t-black/15 p-4 flex gap-2 items-center">
                <Button
                    className="size-10"
                    variant={"outline"}
                    // onClick={() => setIsChatVisible(false)}
                >
                    <Link2 className="size-4" />
                </Button>
                <Input
                    className="w-full h-10"
                    placeholder="Type yuor message..."
                />
                <Button
                    className="size-10"
                    // onClick={() => setIsChatVisible(false)}
                >
                    <Send className="size-4" />
                </Button>
            </div>
        </>
    );
};

export default MiniChat;
