import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  let bodyObject = req.body;
  await db
    .collection("boards")
    .update(
      { _id: ObjectId(bodyObject.boardId) },
      { $push: { tasks: bodyObject.newTask } }
    );
  res.json("Added new task");
}
