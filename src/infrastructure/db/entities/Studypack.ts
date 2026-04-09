
import mongoose from "mongoose";

const studypackSchema = new mongoose.Schema({

  heading: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Headings",
    required: true,
  },
  assignment: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: false,
  },
  pre_content: {
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
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  
  
});

const StudyPack = mongoose.model("StudyPack", studypackSchema);

export default StudyPack;
