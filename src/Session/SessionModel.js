import SessionSchema from "./SessionSchema.js";

export const insertNewSession = (obj) => {
  return SessionSchema(obj).save();
};

// @token should be a string
export const deleteSession = async (token) => {
  const dt = await SessionSchema.findOneAndDelete({ token });
};
export const deleteSessionByFilter = async (filter) => {
  console.log(filter);
  const dt = await SessionSchema.findOneAndDelete(filter);
  return dt;
};
