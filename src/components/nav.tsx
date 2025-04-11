"use client";
import Link from "next/link";
import BlackLogo from "./assets/BlackLogo";
import { Button } from "./ui/button";
import { Bell, Plus, UserRound } from "lucide-react";
import Spinner from "./spinner";
import { useAuth } from "@/hooks/use-auth";

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
            <Link href={"/me"} className="flex focus:outline-0">
                <Button variant={"dark"}>
                    <UserRound size={5} />
                </Button>
            </Link>
            <Link href={"/notifications"} className="flex focus:outline-0">
                <Button variant={"dark"}>
                    <Bell size={5} />
                </Button>
            </Link>
            <Link href={"/tasks/new-task"} className="ms-4 focus:outline-0">
                <Button variant={"white"} className="gap-2">
                    <Plus size={5} />
                    <span className="hidden sm:block">New Task</span>
                </Button>
            </Link>
        </div>
    );
};

const Nav = () => {
    const { isLoading, isLoggedIn } = useAuth();

    return (
        <div className="p-6  w-full relative">
            <div className="min-h-[68px] rounded-md bg-[#1e1e1e] py-4 px-6 w-full flex justify-between items-center">
                <Link href="/">
                    <BlackLogo color="white" />
                </Link>
                {isLoading ? (
                    <Spinner variant="white" className="mx-4" />
                ) : isLoggedIn ? (
                    <LoggedInButtons />
                ) : (
                    <NotLoggedInButtons />
                )}
            </div>
        </div>
    );
};

export default Nav;
