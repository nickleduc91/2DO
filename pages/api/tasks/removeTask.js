import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;

  try {
    // Remove the task and all its children
    const removedTask = await removeTaskAndChildren(bodyObject.taskId);

    if (!removedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (!bodyObject.isSubTask) {
      if(removedTask.completed) {
        await Boards.updateOne(
          { _id: bodyObject.boardId },
          { $inc: { completionCount: -1 } }
        );
      } 
      await Boards.findByIdAndUpdate(
        bodyObject.boardId,
        {
          $pull: { tasks: bodyObject.taskId },  // Remove the updated task from the array
        },
        { new: true }
      );
    } else {
      await Task.findByIdAndUpdate(
        bodyObject.parentId,
        {
          $pull: { subTasks: bodyObject.taskId },  // Remove the updated task from the array
        },
        { new: true }
      );
    }

    res.json({ message: "Removed task and its children", task: removedTask });
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function removeTaskAndChildren(taskId) {
  const task = await Task.findByIdAndRemove(taskId);

  if (!task) {
    return null;
  }

  // Recursively remove all children tasks
  for (const subTaskId of task.subTasks) {
    await removeTaskAndChildren(subTaskId);
  }

  return task;
}