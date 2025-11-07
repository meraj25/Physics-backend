import mongoose from "mongoose";
import { string } from "zod";

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
