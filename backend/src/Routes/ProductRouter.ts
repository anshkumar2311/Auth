import { Router } from "express";
import { ensureAuth } from "../Middlewares/Auth.ts";
const router = Router();

router.get("/", ensureAuth, (req, res) => {
    // console.log('-----logged in user detail-----', req.user);
    res.status(200).json([
        {
            name: "product 1",
            price: 100
        },
        {
            name: "product 2",
            price: 200
        },
    ])
});
export { router as productRouter };
