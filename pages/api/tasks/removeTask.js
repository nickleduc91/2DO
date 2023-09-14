import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  await Boards.findByIdAndUpdate(bodyObject.boardId, {
    $set: {
      tasks: bodyObject.tasks,
    },
  });
  res.json("Removed task");
}
