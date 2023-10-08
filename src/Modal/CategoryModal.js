import mongoose from "mongoose";

const category = mongoose.model("categories", {});
export const getCategory = () => {
  return category.find();
};

export const getCategorybyId = (_id) => {
  return category.findById(_id);
};
