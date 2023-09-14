import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  let update = {};

  if (bodyObject.username) {
    update["username"] = bodyObject.username;
  }
  if (bodyObject.password) {
    update["password"] = bodyObject.password;
  }
  if (bodyObject.firstName) {
    update["firstName"] = bodyObject.firstName;
  }
  if (bodyObject.lastName) {
    update["lastName"] = bodyObject.lastName;
  }

  await User.updateOne({ _id: bodyObject.userId }, { $set: update });
  res.json("Updated User");
}
