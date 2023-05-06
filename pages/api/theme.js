import { connectToDatabase } from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  await db
    .collection("users")
    .updateOne({ _id: ObjectId(bodyObject.userId) }, { $set: {theme: bodyObject.theme} });
  res.json("Updated User");
}