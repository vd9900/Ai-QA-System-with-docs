import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/dbConnect";

if (process.env.ENV !== "PROD") {
  dotenv.config({ path: "../server/config.env" });
}

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server running  ${process.env.PORT}`);
});
