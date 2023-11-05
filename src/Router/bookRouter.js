import express from "express";
import {
  getBooking,
  getbookById,
  insertBook,
} from "../Modal/Book/bookModel.js";
import { bookingConfirmEmail } from "../helper/nodemailer.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const data = await insertBook(req.body);
    if (data._id) {
      await bookingConfirmEmail(data);
      res.json({
        status: "success",
        message: "Booking reserved",
      });
      return;
    }
    res.json({
      status: "error",
      message: "Booking failed",
    });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const data = await getBooking();
    res.json({
      status: "success",
      message: "Here is the bookings list",
      data,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
