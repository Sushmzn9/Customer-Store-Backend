import express from "express";
import { getPayment, getPaymentById } from "../Modal/PaymentModel.js";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const payment = _id ? await getPaymentById(_id) : await getPayment();
    res.json({
      status: "success",
      message: "Here is the Payment",
      payment,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
