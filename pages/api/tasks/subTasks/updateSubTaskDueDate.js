import connectToDatabase from "../../../../lib/mongodb";
import Boards from "../../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  console.log("HERE");
  console.log(bodyObject);
  await Boards.findOneAndUpdate(
    {
      _id: bodyObject.boardId,
      "tasks.subTasks.id": bodyObject.taskId,
    },
    {
      $set: {
        "tasks.$[task].subTasks.$[subTask].dueDate": bodyObject.dueDate,
      },
    },
    {
      arrayFilters: [{ "task.subTasks.id": bodyObject.taskId }, { "subTask.id": bodyObject.taskId }],
      new: true, // to return the modified document
    }
  );
  res.json("Completed task");
}
