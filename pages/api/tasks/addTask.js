import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  await Boards.findByIdAndUpdate(bodyObject.boardId, {
    $push: {
      tasks: {
        $each: [bodyObject.newTask],
        $position: 0, // Add to the front of the array
      },
    },
  });
  res.json("Added new task");
}
