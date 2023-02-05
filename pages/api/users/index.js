import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
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
    res.json({ status: 200, data: users });;
  } catch (e) {
    throw new Error(e).message;
  }
};
