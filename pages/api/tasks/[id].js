import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;
  const task = await Boards.findOne({ tasks: { $elemMatch: { id: id } } });
  res.status(200).json(task);
}
