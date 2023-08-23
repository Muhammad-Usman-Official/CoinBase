import "dotenv/config";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export default function createSecretToken(id: Types.ObjectId) {
  return (
    jwt.sign({ id }, process.env.TOKEN_KEY!), { expiresIn: 3 * 24 * 60 * 60 }
  );
}
