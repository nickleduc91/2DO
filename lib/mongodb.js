import mongoose from "mongoose";

async function connectToDatabase() {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
}

export default connectToDatabase;
