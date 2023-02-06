import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  let myPost = await db.collection("users").insertOne(bodyObject);
  res.json(myPost.ops[0]);
}
