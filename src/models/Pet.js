import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  age: Number,
  type: { type: String, enum: ["dog", "cat", "bird"] },
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
