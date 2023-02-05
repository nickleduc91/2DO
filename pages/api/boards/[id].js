import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { id } = req.query;

    const board = await db.collection("boards").findOne({
      _id: ObjectId(id),
    });

    res.status(200).json(board);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
};
