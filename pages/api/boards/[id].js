import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.query;
    const board = await Boards.findOne({
      _id: id,
    });
    res.status(200).json(board);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
};
