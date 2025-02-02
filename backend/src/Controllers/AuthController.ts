import bcrypt from "bcrypt";
// import { read } from "fs";
import { User } from "../Models/user.ts";
import jwt from "jsonwebtoken";
import { eventNames } from "node:process";

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "user already exists, you can login", success: false });
        }
        const userModel = new User({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "user created successfully",
            success: true
        });
    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}
const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        const errorMsg = "authentication failed invalid email or password";
        if (!existingUser) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign({ email: existingUser.email, userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            message: "Login success",
            success: true,
            jwtToken,
            email,
            name: existingUser.name,
        });
    } catch (err) {
        res.status(500).json({ message: "internal server error", success: false });
    }
}
export { signup };
export { login };
