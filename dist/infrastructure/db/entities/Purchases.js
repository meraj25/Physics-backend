"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchasesSchema = new mongoose_1.default.Schema({
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
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'completed', // ← admin unlocks are always completed
        required: true,
    },
});
const Purchases = mongoose_1.default.model("Purchases", purchasesSchema);
exports.default = Purchases;
//# sourceMappingURL=Purchases.js.map