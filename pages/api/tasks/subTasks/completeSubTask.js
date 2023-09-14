import connectToDatabase from "../../../../lib/mongodb";
import Boards from "../../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  await Boards.updateOne(
    {
      _id: bodyObject.boardId,
      "tasks.id": bodyObject.parentId,
    },
    {
      $set: {
        "tasks.$.subTasks": bodyObject.tasks,
      },
    }
  );

  res.json("Removed task");
}
