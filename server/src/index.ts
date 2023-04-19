import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/dbConnect";



connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server running  ${process.env.PORT}`);
});
