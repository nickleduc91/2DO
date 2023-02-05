import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("test");
  let bodyObject = req.body;
  let myPost = await db.collection("users").insertOne(bodyObject);
  res.json(myPost.ops[0]);
}
