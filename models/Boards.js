import { Schema, model, models } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const boardsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  tasks: [
    {
      _id: false,
      name: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      id: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      dueDate: {
        type: String,
        required: false,
      },
      subTasks: [
        {
          _id: false,
          name: {
            type: String,
            required: true,
          },
          completed: {
            type: Boolean,
            default: false,
          },
          id: {
            type: Number,
            required: true,
          },
          dueDate: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  userId: { type: ObjectId, required: true },
});

const Boards = models.Boards || model("Boards", boardsSchema);
export default Boards;
