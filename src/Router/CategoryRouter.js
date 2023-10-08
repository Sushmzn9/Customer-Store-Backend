import express from "express";
import { getCategory, getCategorybyId } from "../Modal/CategoryModal.js";

const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const category = _id ? await getCategorybyId(_id) : await getCategory();

    res.json({
      status: "success",
      message: "Here is the category/s",
      category,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
