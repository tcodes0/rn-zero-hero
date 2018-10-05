import mongoose, { Schema } from "mongoose";

const authorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number
});

export default mongoose.model("Author", authorSchema);
