"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var peContentSchema = new mongoose_1.default.Schema({
    heading: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Pre-Engineering_Headings",
        required: true,
    },
    assignment: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: false,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
});
var PEContent = mongoose_1.default.model("PEContent", peContentSchema);
exports.default = PEContent;
//# sourceMappingURL=PEContent.js.map