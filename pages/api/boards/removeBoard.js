import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  let bodyObject = req.body;
  const { id } = bodyObject;
  const board = await db.collection("boards").deleteOne({
    _id: ObjectId(id),
  });
  res.json("Removed board");
}
