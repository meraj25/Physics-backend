"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var peresultSchema = new mongoose_1.default.Schema({
    contentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "PEContent",
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
var PEResult = mongoose_1.default.model("PEResult", peresultSchema);
exports.default = PEResult;
//# sourceMappingURL=PEResult.js.map