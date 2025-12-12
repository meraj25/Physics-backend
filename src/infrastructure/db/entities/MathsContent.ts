
import mongoose from "mongoose";

const mathsContentSchema = new mongoose.Schema({

  heading: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Maths_Headings",
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

const MathsContent = mongoose.model("MathsContent", mathsContentSchema);

export default MathsContent;