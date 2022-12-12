import mongoose from "mongoose";

const todoSchema: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
  },
});


export default mongoose.model("Todo", todoSchema)