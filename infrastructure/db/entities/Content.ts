import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({

  year: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic", 
    required: true,
  },
  assignment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  
});

const Content = mongoose.model("Content", contentSchema);

export default Content;