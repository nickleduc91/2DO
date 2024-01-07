import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;

  try {
    // Ensure you have the task ID available
    const taskId = bodyObject.taskId;
    const taskDescription = bodyObject.taskDescription;

    // Update the task based on the provided update object
    const updateBoard = await Task.findByIdAndUpdate(
      taskId,
      { description: taskDescription },
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
