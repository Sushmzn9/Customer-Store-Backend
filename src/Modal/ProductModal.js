import mongoose from "mongoose";

const product = mongoose.model("products", {});
export const getProduct = () => {
  return product.find();
};

export const getProductById = (_id) => {
  return product.findById(_id);
};

export const getProductByCat = (filter) => {
  const _id = new mongoose.Types.ObjectId(filter);
  return product.find({ parentCat: _id });
};

export const getOneProduct = (filter) => {
  return product.findOne(filter);
};
