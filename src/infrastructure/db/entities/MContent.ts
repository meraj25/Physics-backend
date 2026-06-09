
import mongoose from "mongoose";


const mcontentSchema = new mongoose.Schema({

  yearId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Year",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  assignment: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pre_content: {
    type: String,
    required: true,
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
  thumbnail_url:{
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },

  
},{ timestamps: true });

const MContent = mongoose.model("MContent", mcontentSchema);

export default MContent;