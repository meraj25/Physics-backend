import mongoose from "mongoose";

const mathsheadingsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  main:{
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Maths_Headings = mongoose.model("Maths_Headings", mathsheadingsSchema);

export default Maths_Headings;