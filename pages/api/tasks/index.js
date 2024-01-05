import connectToDatabase from "../../../lib/mongodb";
import Task from "../../../models/Task";

export default async (req, res) => {
  try {
    await connectToDatabase();
    const query = req.query;
    const { taskIds, subTaskIds } = query;

    if (taskIds) {
      // Convert taskIds to an array of ObjectId
      const taskIdsArray = taskIds.split(",").map((id) => id.trim());

      // Fetch tasks based on the taskIds array, preserving order
      let array = [];

      for (const id of taskIdsArray) {
        const task = await Task.findById(id);
        if (task) {
          array.push(task);
        }
      }

      res.status(200).json(array);
    } else if (subTaskIds) {
      // Convert subTaskIds to an array of ObjectId
      const subTaskIdsArray = subTaskIds.split(",").map((id) => id.trim());

      // Fetch tasks based on the subTaskIds array, preserving order
      let array = [];

      for (const id of subTaskIdsArray) {
        const task = await Task.findById(id);
        if (task) {
          array.push(task);
        }
      }

      res.status(200).json(array);
    }
  } catch (e) {
    console.error("Error fetching tasks:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
};