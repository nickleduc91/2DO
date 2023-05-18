import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    const board = await db.collection("boards").findOne({
      _id: ObjectId(id),
    });
    res.status(200).json(board);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
};
