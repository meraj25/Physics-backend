"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const spresultSchema = new mongoose_1.default.Schema({
    contentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Studypack",
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
const SPResult = mongoose_1.default.model("SPResult", spresultSchema);
exports.default = SPResult;
//# sourceMappingURL=SPResult.js.map