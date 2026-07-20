import User from "../models/User.js";

export const getAllUsers = async () => {
  return await User.find();
};

export const createNewUser = async (name) => {
  return await User.create({
    name,
  });
};
