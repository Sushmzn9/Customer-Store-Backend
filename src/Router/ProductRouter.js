import express from "express";
import {
  getProduct,
  getProductByCat,
  getProductById,
} from "../Modal/ProductModal.js";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = _id ? await getProductById(_id) : await getProduct();
    res.json({
      status: "success",
      message: "Here is the products",
      product,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/category/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getProductByCat(_id);
    console.log(product);
    res.json({
      status: "success",
      message: "Here is the products",
      product,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
