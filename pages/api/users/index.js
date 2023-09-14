import connectToDatabase from "../../../lib/mongodb";
import User from "../../../models/User";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const query = req.query;
    const { username } = query;
    let users;
    if (username) {
      users = await User.findOne({
        username,
      });
    } else {
      users = await User.find({});
    }
    res.json({ data: users });
  } catch (e) {
    throw new Error(e).message;
  }
};
