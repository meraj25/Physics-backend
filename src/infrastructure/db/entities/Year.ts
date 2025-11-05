import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  slug: {
    type: Number,
    required: true,
  },
});

const Year = mongoose.model("Year", yearSchema);

export default Year;
