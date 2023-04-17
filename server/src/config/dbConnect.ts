import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.DB_URL!)
    .then((res: mongoose.Mongoose) =>
      console.log("Server connected to Database")
    )
    .catch((err: Error) => console.log(err));
}

export default connectDB;
