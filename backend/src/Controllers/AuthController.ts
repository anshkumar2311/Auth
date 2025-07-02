import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.ts";
import type { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please log in", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userModel = new User({ name, email, password: hashedPassword });
        await userModel.save();

        res.status(201).json({
            message: "User created successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        const errorMsg = "Authentication failed. Invalid email or password.";
        if (!existingUser) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            { email: existingUser.email, userId: existingUser._id },
            process.env.JWT_SECRET!,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: existingUser.name,
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

export { signup, login };
