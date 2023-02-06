import { connectToDatabase } from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const {db} = await connectToDatabase()
    const query = req.query;
    const { username } = query;
    let users;
    if (username) {
      users = await db.collection("users").findOne({
        username
      });
    } else {
      users = await db.collection("users").find({}).toArray();
    }
    res.json({ data: users });;
  } catch (e) {
    throw new Error(e).message;
  }
};
