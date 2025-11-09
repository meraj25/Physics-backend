
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
  paymentstatus: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
});

const StudyPack = mongoose.model("StudyPack", studypackSchema);

export default StudyPack;
