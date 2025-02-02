import { Router } from "express";
import { ensureAuth } from "../Middlewares/Auth";
const router = Router();

router.get("/", ensureAuth, (req, res) => {
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
