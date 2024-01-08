import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;
  const task = await Task.findById(id)
  const parentTasks = await getAllParentTasks(id, []);
  let response = {
    task: task,
    parentTasks: parentTasks.reverse()
  }
  res.status(200).json(response);
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
