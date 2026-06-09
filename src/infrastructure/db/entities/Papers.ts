
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
  thumbnail_url:{
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  
});

const Paper = mongoose.model("Paper", paperSchema);

export default Paper;