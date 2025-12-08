import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model("Result", resultSchema);
export default Result;