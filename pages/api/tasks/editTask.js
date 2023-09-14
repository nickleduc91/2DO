import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  let update = {};
  if (bodyObject.taskName) {
    update["tasks.$.name"] = bodyObject.taskName;
  }
  if (bodyObject.taskDescription || bodyObject.taskDescription == null) {
    update["tasks.$.description"] = bodyObject.taskDescription;
  }
  await Boards.updateOne(
    {
      _id: bodyObject.boardId,
      "tasks.id": bodyObject.taskId,
    },
    {
      $set: update,
    }
  );
  res.json("Edited task");
}
