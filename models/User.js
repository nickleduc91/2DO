import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  theme: { type: String, required: true },
});

const User = models.User || model("User", userSchema);
export default User;
