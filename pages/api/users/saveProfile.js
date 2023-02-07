import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  let update = {};

  if (bodyObject.username) {
    update["username"] = bodyObject.username;
  }
  if (bodyObject.password) {
    update["password"] = bodyObject.password;
  }
  if (bodyObject.firstName) {
    update["profile.firstName"] = bodyObject.firstName;
  }
  if (bodyObject.lastName) {
    update["profile.lastName"] = bodyObject.lastName;
  }

  await db
    .collection("users")
    .updateOne({ _id: ObjectId(bodyObject.userId) }, { $set: update });
  res.json("Updated User");
}
