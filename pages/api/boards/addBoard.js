import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const {db} = await connectToDatabase()
  let bodyObject = req.body;
  await db.collection("boards").insertOne(bodyObject.newBoard);
  res.json("Added new Board");
}
