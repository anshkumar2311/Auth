import { Router } from "express";
import { signup } from "../Controllers/AuthController";
import { signupValidation } from "../Middlewares/AuthValidation";
const router = Router();

router.post("/login", (req, res) => {
    res.send("login success");
});
router.post("/signup", signupValidation, signup);
export { router as authRouter };
