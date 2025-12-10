import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({


    userId: {
      type: String,
      required: true,
      index: true,
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'LKR',
      uppercase: true,
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
      required: true,
      index: true,
    },
    paymentId: {
      type: String,
      sparse: true,
    },
    paymentMethod: {
      type: String,
    },
  },

{ timestamps: true }

);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;