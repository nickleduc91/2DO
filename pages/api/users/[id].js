import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    const user = await db.collection("users").findOne({
      _id: ObjectId(id),
    });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
};
