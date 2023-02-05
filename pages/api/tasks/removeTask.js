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
      {
        $set: {
            tasks: bodyObject.tasks
        }
      }
    );
  res.json("Removed task");
}
