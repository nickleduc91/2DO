import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      bodyObject.taskId,
      { dueDate: bodyObject.dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Updated dueDate for task", task: updatedTask });
  } catch (error) {
    console.error("Error updating task dueDate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}