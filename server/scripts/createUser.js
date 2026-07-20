// createUser.js
import User from "../models/User.js";

await User.create({ name: "test user" });

console.log("User created");
