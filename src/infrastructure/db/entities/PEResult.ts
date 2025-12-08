import mongoose from "mongoose";

const peresultSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PEContent",
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

const PEResult = mongoose.model("PEResult", peresultSchema);
export default PEResult;