import mongoose from "mongoose";

const payment = mongoose.model("payment", {});
export const getPayment = () => {
  return payment.find();
};

export const getPaymentById = (_id) => {
  return payment.findById(_id);
};
