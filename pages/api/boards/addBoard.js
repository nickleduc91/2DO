import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const {db} = await connectToDatabase()
  let bodyObject = req.body;
  const board = await db.collection("boards").insertOne(bodyObject.newBoard);
  res.json(board.ops[0]);
}
