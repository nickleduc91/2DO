import { connectToDatabase } from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  await db.collection("boards").updateOne(
    {
      _id: ObjectId(bodyObject.boardId),
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
