import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  let bodyObject = req.body;
  await db.collection("boards").insertOne(bodyObject.newBoard);
  res.json("Added new Board");
}
