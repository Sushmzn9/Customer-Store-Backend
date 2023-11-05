import express from "express";
import {
  getOrdering,
  getOrderingByToken,
  insertOrder,
} from "../Modal/OrderSchema/OrderModel.js";

const router = express.Router();

router.get("/:orderNumber?", async (req, res, next) => {
  try {
    const { orderNumber } = req.params;
    const data = orderNumber
      ? await getOrderingByToken(orderNumber)
      : await getOrdering();
    res.json({
      status: "success",
      message: "Here is the orderList",
      data,
    });
    console.log(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await insertOrder(req.body);
    res.json({
      status: "success",
      message: "Order Created",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
