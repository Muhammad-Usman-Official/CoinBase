import * as mongoose from "mongoose";

const { Schema, model } = mongoose;

const refreshTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export default model("RefreshToken", refreshTokenSchema, "tokens");
