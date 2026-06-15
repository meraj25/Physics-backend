"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var resultSchema = new mongoose_1.default.Schema({
    contentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Content",
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
var Result = mongoose_1.default.model("Result", resultSchema);
exports.default = Result;
//# sourceMappingURL=Result.js.map