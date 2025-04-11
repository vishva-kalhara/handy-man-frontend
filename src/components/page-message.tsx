import Link from "next/link";
import { Button } from "./ui/button";

type props = {
    tag: string;
    title: string;
    description: string;
    action: {
        text: string;
        link: string;
    };
    fallback?: {
        text: string;
        link: string;
    };
};

const PageMessage = ({ action, description, fallback, tag, title }: props) => {
    return (
        <div className="max-w-lg mx-auto flex  justify-center flex-col mb-10 py-8">
            <div className="w-full justify-center flex">
                <span className="font-semibold text-xs text-red-500 py-1 px-2 bg-red-100 border border-red-300 rounded-md">
                    {tag}
                </span>
            </div>
            <h1 className="font-semibold text-2xl text-center mt-4">{title}</h1>
            <p className="text-base text-center text-black/50 mt-2">
                {description}
            </p>
            <div className="flex gap-2 justify-center mt-10">
                {fallback && (
                    <Link href={fallback?.link} className="flex justify-center">
                        <Button
                            variant={"outline"}
                            className="bg-white/70! hover:bg-white!"
                        >
                            {fallback?.text}
                        </Button>
                    </Link>
                )}
                <Link href={action.link} className="flex justify-center">
                    <Button>{action.text}</Button>
                </Link>
            </div>
        </div>
    );
};

export default PageMessage;
