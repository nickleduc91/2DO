import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  const newBoard = new Boards(bodyObject.newBoard);
  await newBoard.save();
  res.json(newBoard)
}
