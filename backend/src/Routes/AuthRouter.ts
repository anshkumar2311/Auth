import { Router } from "express";
import { login, signup } from "../Controllers/AuthController";
import { loginValidation, signupValidation } from "../Middlewares/AuthValidation";
const router = Router();

// router.post("/login", (req, res) => {
//     res.send("login success");
// });
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
export { router as authRouter };
