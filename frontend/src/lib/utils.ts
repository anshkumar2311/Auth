import React from "react";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export const handleSuccess = (message) => {
    toast.success(message, {
        position: "top-right",
    });
}
export const handleError = (message) => {
    toast.error(message, {
        position: "top-right",
    });
}
