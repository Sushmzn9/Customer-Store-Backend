import bookSchema from "./bookSchema.js";

export const insertBook = (obj) => {
  return bookSchema(obj).save();
};
export const getBookingByEmail = (email) => {
  return bookSchema.findOne(email);
};
export const getBooking = () => {
  return bookSchema.find();
};
export const getbookById = (_id) => {
  return bookSchema.findOne({ _id });
};
