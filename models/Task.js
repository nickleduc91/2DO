import { Schema, model, models } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const taskSchema = new Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false, required: true },
  parentTask: { type: Schema.Types.ObjectId, ref: "Task" },
  subTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  description: { type: String, required: false },
  dueDate: { type: String, required: false },
  boardId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },
  created: { type: Date, default: Date.now },
  isSubTask: { type: Boolean, default: false },
});

const Task = models.Task || model("Task", taskSchema);
export default Task;
