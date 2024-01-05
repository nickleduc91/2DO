import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;
  const task = await Task.findById(id)
  res.status(200).json(task);
}
