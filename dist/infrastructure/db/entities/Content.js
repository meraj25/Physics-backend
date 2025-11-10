"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var contentSchema = new mongoose_1.default.Schema({
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
    paymentstatus: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
var Content = mongoose_1.default.model("Content", contentSchema);
exports.default = Content;
//# sourceMappingURL=Content.js.map