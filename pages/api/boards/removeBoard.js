import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  const { id } = bodyObject;
  const board = await db.collection("boards").deleteOne({
    _id: ObjectId(id),
  });
  res.json("Removed board");
}
