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
      $push: {
        "tasks.$.subTasks": {
          name: bodyObject.newTask.name,
          completed: false,
          id: bodyObject.newTask.id,
        },
      },
    }
  );
  res.json("Added new task");
}
