"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var mcontentSchema = new mongoose_1.default.Schema({
    yearId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Year",
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    assignment: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pre_content: {
        type: String,
        required: true,
    },
    paymentstatus: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
var MContent = mongoose_1.default.model("MContent", mcontentSchema);
exports.default = MContent;
//# sourceMappingURL=MContent.js.map