import db from "../../db";
import User from "../../models/User";

export default async function handler(req, res) {
  try {
    const { username, password, profile } = req.body;

    // Create a new user
    const newUser = new User({
      username,
      password,
      profile,
    });

    // Save the user to the database
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
