import mongoose from "mongoose";

const purchasesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: false,
  },
  contentId: {
    type: String,
    required: true,
  },
  amount: { type: Number, required: false },
  paidAt: { type: Date, default: Date.now },
});

const Purchases = mongoose.model("Purchases", purchasesSchema);
export default Purchases;