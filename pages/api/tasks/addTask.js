import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  try {
    const { newTask, parentId } = req.body;
    const createdTask = await Task.create(newTask);

    if (newTask.isSubTask) {
      // Update the parent task with the new subtask id added to the front
      await Task.findByIdAndUpdate(
        parentId,
        {
          $push: {
            subTasks: {
              $each: [createdTask._id],
              $position: 0,
            },
          },
        },
        { new: true }
      );
    } else {
      // Update the board with the new task id added to the front
      await Boards.findByIdAndUpdate(
        newTask.boardId,
        {
          $push: {
            tasks: {
              $each: [createdTask._id],
              $position: 0,
            },
          },
        },
        { new: true }
      );
    }

    // Increment completionCount in the corresponding board
    await Boards.findByIdAndUpdate(
      newTask.boardId,
      { $inc: { numTasks: 1 } },
      { new: true }
    );

    res.json(createdTask);
  } catch (error) {
    console.error("Error adding new task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}