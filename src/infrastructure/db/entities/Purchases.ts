import mongoose from "mongoose";

const purchasesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ContentId:{
    type: String,
    required: true,
  },
  amount: { type: Number, required: true },

  paidAt: { type: Date, default: Date.now },
});

const Purchases = mongoose.model("Purchases", purchasesSchema);
export default Purchases;