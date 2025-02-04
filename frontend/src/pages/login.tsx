"use client";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import React from "react";
import { Input } from "../components/ui/input";
import { cn, handleError, handleSuccess } from "../lib/utils";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
    const [loginInfo, setloginInfo] = React.useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
    };
    const handlelogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return toast.error("Please fill all the fields");
        }
        try {
            const url = "http://localhost:5000/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            });
            const data = await response.json();
            const { success, message,jwtToken,name, error } = data;
            if (success) {
                toast.success(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0]?.message;
                toast.error(details);
            } else if (!success) {
                toast.error(message);
            }
            console.log(data);
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="max-w-md w-full mx-auto border border-gray-500 rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
                    Welcome to T-REX
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 text-center dark:text-neutral-300">
                    Login to Trex
                </p>

                <form className="my-8" onSubmit={handlelogin}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" placeholder="Enter your Email Adress..." type="email" value={loginInfo.email} onChange={handleChange} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" placeholder="••••••••" type="password" value={loginInfo.password} onChange={handleChange} />
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-3"
                        type="submit"
                    >
                        Login &rarr;
                        <BottomGradient />
                    </button>
                    <span className="text-red-500">Don't have an Account?
                        <Link to="/signup" className="text-blue-500 text-lg ml-3 hover:text-blue-400">
                            Sign Up
                        </Link>
                    </span>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                GitHub
                            </span>
                            <BottomGradient />
                        </button>
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="submit"
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Google
                            </span>
                            <BottomGradient />
                        </button>

                    </div>
                </form>
                <Toaster />
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
