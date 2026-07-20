// services/user.service.js
import { getAllUsers, createNewUser } from "../services/user.service.js";

// GET всех пользователей
export const getUsers = async (req, res) => {
  const users = await getAllUsers();

  res.json(users);
};

// POST создать пользователя
export const createUser = async (req, res) => {
  const { name } = req.body;

  const user = await createNewUser(name);

  res.json(user);
};
