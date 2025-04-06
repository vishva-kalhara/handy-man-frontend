import Link from "next/link";
import BlackLogo from "./assets/BlackLogo";
import { Button } from "./ui/button";
import { Bell, Plus, UserRound } from "lucide-react";

const NotLoggedInButtons = () => {
    return (
        <div className="flex gap-2">
            <Link
                href={"/auth/sign-in"}
                className="hidden sm:flex focus:outline-0"
            >
                <Button variant={"dark"}>Sign In</Button>
            </Link>
            <Link href={"/auth/create-account"} className=" focus:outline-0">
                <Button variant={"white"}>Create Account</Button>
            </Link>
        </div>
    );
};

const LoggedInButtons = () => {
    return (
        <div className="flex">
            <Link href={"/me"} className="hidden sm:flex focus:outline-0">
                <Button variant={"dark"}>
                    <UserRound size={5} />
                </Button>
            </Link>
            <Link
                href={"/notifications"}
                className="hidden sm:flex focus:outline-0"
            >
                <Button variant={"dark"}>
                    <Bell size={5} />
                </Button>
            </Link>
            <Link href={"/tasks/new-task"} className="ms-4 focus:outline-0">
                <Button variant={"white"} className="gap-2">
                    <Plus size={5} /> New Task {"  "}
                </Button>
            </Link>
        </div>
    );
};

const Nav = () => {
    const isLoggedIn = true;

    return (
        <div className="p-6 w-full relative">
            <div className=" rounded-md bg-[#1e1e1e] py-4 px-6 w-full flex justify-between items-center">
                <Link href="/">
                    <BlackLogo color="white" />
                </Link>
                {isLoggedIn ? <LoggedInButtons /> : <NotLoggedInButtons />}
            </div>
        </div>
    );
};

export default Nav;
