import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

let User;

try {
  // Attempt to retrieve the existing User model
  User = model("User");
} catch {
  // Define the User schema if the model doesn't exist
  const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    theme: { type: String, required: true },
  });

  userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Create the User model
  User = model("User", userSchema);
}

export default User;