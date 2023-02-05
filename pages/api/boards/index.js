import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const query = req.query;
    const { userId } = query;
    const boards = await db.collection("boards").find({
      userId
    }).toArray();
    res.json({ status: 200, data: boards });
  } catch (e) {
    throw new Error(e).message;
  }
};
