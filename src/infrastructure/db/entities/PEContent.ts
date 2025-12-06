
import mongoose from "mongoose";

const peContentSchema = new mongoose.Schema({

  heading: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Pre-Engineering_Headings",
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
  paymentstatus: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  
  
});

const PEContent = mongoose.model("PEContent", peContentSchema);

export default PEContent;