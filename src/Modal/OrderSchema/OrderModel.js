import OrderSchema from "./OrderSchema.js";

export const insertOrder = (obj) => {
  return OrderSchema(obj).save();
};
export const getOrderingByEmail = (email) => {
  return OrderSchema.findOne(email);
};
export const getOrderingByToken = (orderNumber) => {
  console.log(orderNumber);
  return OrderSchema.findOne({ orderNumber: orderNumber });
};

export const getOrdering = () => {
  return OrderSchema.find();
};
export const getOrderById = (_id) => {
  return OrderSchema.findOne({ _id });
};
