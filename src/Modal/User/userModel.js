import userSchema from "./userSchema.js";

export const insertUser = (obj) => {
  return userSchema(obj).save();
};
export const getUserByEmail = (email) => {
  return userSchema.findOne(email);
};
export const getUserById = (_id) => {
  return userSchema.findOne({ _id });
};
export const getUserDisplay = () => {
  return userSchema.find();
};
export const getOneuser = (filter) => {
  return userSchema.findOne(filter);
};
export const updateUserById = (_id, ...rest) => {
  return userSchema.findByIdAndUpdate(_id, rest);
};
//@filter, @updateObj must be an obj
export const updateUser = (filter, updateObj) => {
  return userSchema.findOneAndUpdate(filter, updateObj, { new: true });
};
export const deleteUser = ({ _id }) => {
  return userSchema.findByIdAndDelete(_id);
};
