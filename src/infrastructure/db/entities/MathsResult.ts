import mongoose from "mongoose";

const mathsresultSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MContent",
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

const MathsResult = mongoose.model("MathsResult", mathsresultSchema);
export default MathsResult;