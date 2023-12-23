import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;

  await Boards.findOneAndUpdate(
    {
      _id: bodyObject.boardId,
      'tasks.id': bodyObject.taskId,
    },
    {
      $set: {
        'tasks.$.dueDate': bodyObject.dueDate,
      },
    },
    { new: true } // to return the modified document
  );
  res.json("Completed task");
}

//finish this and finish the default value of the due date to be equal to the value from db