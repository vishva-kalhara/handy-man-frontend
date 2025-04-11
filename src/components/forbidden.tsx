import Link from "next/link";
import { Button } from "./ui/button";

const ForbiddenCard = () => {
    return (
        <div className="max-w-lg mx-auto flex  justify-center flex-col mb-10 py-8">
            <div className="w-full justify-center flex">
                <span className="font-semibold text-xs text-blue-500 py-1 px-2 bg-blue-100 border border-blue-300 rounded-md">
                    Forbidden
                </span>
            </div>
            <h1 className="font-semibold text-2xl text-center mt-4">
                Access Restricted
            </h1>
            <p className="text-base text-center text-black/50 mt-2">
                This page is reserved for Handy Man members. Please sign in to
                view bids, post tasks, or continue helping your community.
            </p>
            <div className="flex gap-2 justify-center mt-10">
                <Link href="/" className="flex justify-center">
                    <Button
                        variant={"outline"}
                        className="bg-white/70! hover:bg-white!"
                    >
                        Back to Home
                    </Button>
                </Link>
                <Link href="/auth/sign-in" className="flex justify-center">
                    <Button>Sign In Now</Button>
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenCard;
