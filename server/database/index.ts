import mongoose, { ConnectOptions } from "mongoose";
import { MONGO_URL } from "../config";

export default async function dbConnect() {
  await mongoose.connect(MONGO_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);
}
