import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  theme: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  // Compare provided password with hashed password
  return await bcrypt.compare(password, this.password);
};

const User = models.User || model("User", userSchema);
export default User;
