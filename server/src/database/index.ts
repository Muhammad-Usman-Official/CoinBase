import mongoose, { ConnectOptions } from "mongoose";
import express from "express";

const PORT = 3000 || process.env.PORT;
const { MONGO_URL } = process.env;

const app = express();

export default async function dbConnect() {
  await mongoose
    .connect(MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      app.listen(PORT);
      console.log(`Server is listening on port ${PORT}`);
    });
}
