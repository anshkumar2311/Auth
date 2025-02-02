import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connectDB";
import { authRouter } from "./Routes/AuthRouter";
import { productRouter } from "./Routes/ProductRouter";
const app = express();
dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/products", productRouter);

app.listen(5000, () => {
  console.log(`server is running at 5000`);
});
