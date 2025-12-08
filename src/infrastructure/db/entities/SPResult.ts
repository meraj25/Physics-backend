import mongoose from "mongoose";

const spresultSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Studypack",
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

const SPResult = mongoose.model("SPResult", spresultSchema);
export default SPResult;