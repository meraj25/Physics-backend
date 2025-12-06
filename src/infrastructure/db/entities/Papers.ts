
import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({

  
  year: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Year",
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

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;