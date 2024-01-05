import connectToDatabase from "../../../lib/mongodb";
import Boards from "../../../models/Boards";
import Task from "../../../models/Task";

export default async function handler(req, res) {
  await connectToDatabase();
  let bodyObject = req.body;
  const { id } = bodyObject;

  try {
    // Use findOneAndDelete to find and delete the board
    const deletedBoard = await Boards.findOneAndDelete({ _id: id });
    
    if (!deletedBoard) {
      // If no board was found with the specified ID, send a 404 Not Found response
      return res.status(404).json({ message: "Board not found" });
    }

    // Delete all tasks with the same boardId
    await Task.deleteMany({ boardId: id });

    // Send a success response
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    console.error(error);
    // Handle any errors and send an appropriate error response
    res.status(500).json({ error: "Internal server error" });
  }
}
