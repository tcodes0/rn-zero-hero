import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

export const users = [{ name: "foton", hash: bcrypt.hashSync("foton", 1) }];

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  hash: String
});

export default mongoose.model("User", userSchema);
