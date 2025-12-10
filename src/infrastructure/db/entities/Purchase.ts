import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({


    userId: { type: String, required: true }, 
    contentId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    amount: { type: Number, required: true },
    paidAt: { type: Date, default: Date.now },
  },

{ timestamps: true }

);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;