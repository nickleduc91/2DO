import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  let update = {};
  if (bodyObject.taskName) {
    update["name"] = bodyObject.taskName;
  }
  if (bodyObject.taskDescription || bodyObject.taskDescription === null) {
    update["description"] = bodyObject.taskDescription;
  }

  try {
    // Ensure you have the task ID available
    const taskId = bodyObject.taskId; // Replace with the actual field name in your data

    // Update the task based on the provided update object
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      update,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json("Edited task");
  } catch (error) {
    console.error("Error editing task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}