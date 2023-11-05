import dotenv from "dotenv";
dotenv.config();

import { mongoConnect } from "./src/MongoConfig/MongoConnect.js";
mongoConnect();

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 8001;

import categoryRouter from "./src/Router/CategoryRouter.js";
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

import productRouter from "./src/Router/ProductRouter.js";
import userRouter from "./src/Router/userRouter.js";
import paymentRouter from "./src/Router/PaymentRouter.js";
import bookRouter from "./src/Router/bookRouter.js";
import stripeRouter from "./src/Router/stripeRouter.js";
import orderRouter from "./src/Router/OrderRouter.js";

app.use("/api/store/category", categoryRouter);
app.use("/api/store/product", productRouter);
app.use("/api/store/user", userRouter);
app.use("/api/store/payment", paymentRouter);
app.use("/api/store/book", bookRouter);
app.use("/api/store/order", orderRouter);
app.use("/api/store/create-payment-intent", stripeRouter);

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "server running well",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  res.json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) =>
  error
    ? console.log(error.message)
    : console.log(`server is activated at https://localhost:${PORT}`)
);
