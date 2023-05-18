import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  let update = {};
  if (bodyObject.taskName) {
    update["tasks.$.name"] = bodyObject.taskName;
  }
  if (bodyObject.taskDescription) {
    update["tasks.$.description"] = bodyObject.taskDescription;
  }
  await db
    .collection("boards")
    .updateOne(
      { _id: ObjectId(bodyObject.boardId), "tasks.id": bodyObject.taskId },
      { $set: update }
    );
  res.json("Edited task");
}
