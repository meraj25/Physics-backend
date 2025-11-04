import mongoose from "mongoose";

const studypackSchema = new mongoose.Schema({
  Heading: {
    type: String,
    required: true,
  },
  Subheading: {
    type: String,
    required: true,
  },
});

const StudyPack = mongoose.model("StudyPack", studypackSchema);

export default StudyPack;
