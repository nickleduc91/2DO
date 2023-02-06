import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let bodyObject = req.body;
  await db.collection("boards").updateOne(
    { _id: ObjectId(bodyObject.boardId) },
    {
      $set: {
        tasks: bodyObject.tasks,
      },
    }
  );
  res.json("Completed task");
}
