"use client";
import {
    IconBrandGithub,
    IconBrandGoogle
} from "@tabler/icons-react";
import React from "react";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Label } from "../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { appfire } from "../firebase/firebase";

export default function Login() {
    const [loginInfo, setLoginInfo] = React.useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const auth = getAuth(appfire);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return toast.error("Please fill all the fields");
        }
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginInfo),
            });
            const data = await response.json();
            if (data.success) {
                toast.success(data.message);
                localStorage.setItem('token', data.jwtToken);
                localStorage.setItem('loggedInUser', data.name);
                setTimeout(() => navigate('/home'), 1000);
            } else {
                toast.error(data.error || data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome ${user.displayName}`);
            localStorage.setItem("token", user.accessToken);
            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const signInWithGithub = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome ${user.displayName}`);
            localStorage.setItem("token", user.accessToken);
            setTimeout(() => navigate("/home"), 1000);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="max-w-md w-full mx-auto border border-gray-500 rounded-2xl p-8 bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
                    Welcome to T-REX
                </h2>
                <p className="text-neutral-600 text-sm mt-2 text-center dark:text-neutral-300">
                    Login to Trex
                </p>

                <form className="my-8" onSubmit={handleLogin}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" placeholder="Enter your Email..." type="email" value={loginInfo.email} onChange={handleChange} />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="password" className="mt-3">Password</Label>
                        <Input id="password" name="password" placeholder="••••••••" type="password" value={loginInfo.password} onChange={handleChange} />
                    </LabelInputContainer>

                    <button className=" bg-gradient-to-br relative group /btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 mt-5 cursor-pointer font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mb-3"
                        type="submit" type="submit">
                        Login &rarr;
                    </button>

                    <span className="text-red-500">Don't have an Account?
                        <Link to="/signup" className="text-blue-500 text-lg ml-3 hover:text-blue-400">
                            Sign Up
                        </Link>
                    </span>

                    <div className="bg-gray-300 my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4">
                        <button
                            className="flex space-x-2 items-center justify-start px-4 w-full bg-gray-50 dark:bg-zinc-900 rounded-md h-10 font-medium cursor-pointer"
                            type="button"
                            onClick={signInWithGithub}
                        >
                            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Sign in with GitHub
                            </span>
                        </button>
                        <button
                            className="flex space-x-2 items-center justify-start px-4 w-full bg-gray-50 dark:bg-zinc-900 rounded-md h-10 font-medium cursor-pointer"
                            type="button"
                            onClick={signInWithGoogle}
                        >
                            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                                Sign in with Google
                            </span>
                        </button>
                    </div>
                </form>
                <Toaster />
            </div>
        </div>
    );
}

const LabelInputContainer = ({ children }) => (
    <div className="flex flex-col space-y-2 w-full">
        {children}
    </div>
);
