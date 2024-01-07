import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { taskId } = req.query;

  try {
    const parentTasks = await getAllParentTasks(taskId, []);
    parentTasks.reverse()
    res.status(200).json(parentTasks);
  } catch (error) {
    console.error("Error fetching parent tasks:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getAllParentTasks(taskId, parentTasks) {
  const task = await Task.findById(taskId);

  if (!task) {
    return parentTasks.reverse(); // Reverse the order before returning
  }

  if (task.parentTask) {
    const parent = await Task.findById(task.parentTask);
    parentTasks.unshift(parent); // Prepend the parent task to the beginning
    return getAllParentTasks(task.parentTask, parentTasks);
  }

  return parentTasks.reverse(); // Reverse the order before returning
}
