import mongoose from "mongoose";


const yearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Year = mongoose.model("Year", yearSchema);

export default Year;
