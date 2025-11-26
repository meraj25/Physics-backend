import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({


    userId: {
      type: String,
      required: true,  
    },
    contentId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Content',
      required: true,
   
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'LKR',
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
    },
  },

{ timestamps: true }

);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;