import connectToDatabase from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  await User.findByIdAndUpdate(bodyObject.userId, {theme: bodyObject.theme})
  res.json("Updated User");
}