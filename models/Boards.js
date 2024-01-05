import { Schema, model, models } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const boardsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  completionCount: { type: Number, required: true, default: 0 },
  userId: { type: ObjectId, required: true },
  tasks: [{ type: ObjectId }]
});

const Boards = models.Boards || model("Boards", boardsSchema);
export default Boards;
