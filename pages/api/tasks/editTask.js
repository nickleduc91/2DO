import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  await db
    .collection("boards")
    .updateOne(
      { _id: ObjectId(bodyObject.boardId), "tasks.id": bodyObject.taskId },
      { $set: { "tasks.$.name": bodyObject.newName } }
    );
  res.json("Edited task");
}
