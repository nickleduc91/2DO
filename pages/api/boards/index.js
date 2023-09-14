import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const query = req.query;
    const { userId } = query;
    const boards = await Boards.find({ userId });
    res.status(200).json(boards);
  } catch (e) {
    throw new Error(e).message;
  }
};
