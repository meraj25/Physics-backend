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
  orderId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  amount: { type: Number, required: false },
  paidAt: { type: Date, default: Date.now },
  status: {                          // ← ADD THIS
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed',            // ← admin unlocks are always completed
    required: true,
  },
});
const Purchases = mongoose.model("Purchases", purchasesSchema);
export default Purchases;