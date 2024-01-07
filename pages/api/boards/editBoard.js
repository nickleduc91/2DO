import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  let update = {};

  try {
    // Ensure you have the task ID available
    const boardId = bodyObject.boardId;
    const boardName = bodyObject.boardName;

    // Update the task based on the provided update object
    const updateBoard = await Boards.findByIdAndUpdate(
      boardId,
      { name: boardName },
      { new: true }
    );

    if (!updateBoard) {
      return res.status(404).json({ error: "Board not found" });
    }

    res.json("Edited board");
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
