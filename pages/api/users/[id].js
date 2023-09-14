import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const { id } = req.query;
    const user = await User.findOne({
      _id: id,
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send("Internal server error");
  }
};
