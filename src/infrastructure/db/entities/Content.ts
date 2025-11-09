import { link } from "fs";
import mongoose from "mongoose";
import { string } from "zod";

const contentSchema = new mongoose.Schema({

  yearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  topic: {
    type: String,
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
    paymentstatus: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  
});

const Content = mongoose.model("Content", contentSchema);

export default Content;