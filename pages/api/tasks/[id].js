import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // const { db } = await connectToDatabase();
  // const { id } = req.query;
  // const task = await db.collection("boards").findOne({
  //   tasks: {$elemMatch: {id:id}}
  // });
  // res.status(200).json(task);
}
