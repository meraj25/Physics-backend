"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        index: true,
    },
    contentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
const Purchase = mongoose_1.default.model("Purchase", purchaseSchema);
exports.default = Purchase;
//# sourceMappingURL=Purchase.js.map