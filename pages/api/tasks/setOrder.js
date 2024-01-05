import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  try {
    let array = [];
    bodyObject.tasks.forEach((task) => array.push(task._id));

    await Boards.findByIdAndUpdate(
      bodyObject.boardId,
      { tasks: array },
      { new: true }
    );

    res.json({ message: "Updated order" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
