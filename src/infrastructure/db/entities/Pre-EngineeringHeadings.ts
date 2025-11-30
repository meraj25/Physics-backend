import mongoose from "mongoose";

const pre_eng_headingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Pre_Eng_Headings = mongoose.model("Pre_Eng_Headings", pre_eng_headingsSchema);
export default Pre_Eng_Headings;