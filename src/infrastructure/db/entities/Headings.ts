import mongoose from "mongoose";

const headingsSchema = new mongoose.Schema({
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

const Headings = mongoose.model("Headings", headingsSchema);
export default Headings;