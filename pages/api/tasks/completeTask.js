import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      bodyObject.taskId,
      { completed: !bodyObject.status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    // Increment completedCount in Boards collection
    await Boards.updateOne(
      { _id: bodyObject.boardId },
      { $inc: { completionCount: !bodyObject.status ? 1 : -1 } }
    );

    res.json({ message: "Completed task", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
