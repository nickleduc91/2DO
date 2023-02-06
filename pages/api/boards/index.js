import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const query = req.query;
    const { userId } = query;
    const boards = await db
      .collection("boards")
      .find({
        userId,
      })
      .toArray();
    res.json({ data: boards });
  } catch (e) {
    throw new Error(e).message;
  }
};
