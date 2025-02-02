import bcrypt from "bcrypt";
// import { read } from "fs";
import { User } from "../Models/user.ts";

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
export { signup };
