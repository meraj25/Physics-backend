import mongoose from "mongoose";

const mspresultSchema = new mongoose.Schema({
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MathsContent",
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

const MSPResult = mongoose.model("MSPResult", mspresultSchema);
export default MSPResult;