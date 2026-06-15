"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var paperSchema = new mongoose_1.default.Schema({
    year: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Year",
        required: true,
    },
    topic: {
        type: String,
        required: false,
    },
    paymentstatus: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    thumbnail_url: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
});
var Paper = mongoose_1.default.model("Paper", paperSchema);
exports.default = Paper;
//# sourceMappingURL=Papers.js.map