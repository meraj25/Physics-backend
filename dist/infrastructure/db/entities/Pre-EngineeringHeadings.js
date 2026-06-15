"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pre_eng_headingsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
});
const Pre_Eng_Headings = mongoose_1.default.model("Pre_Eng_Headings", pre_eng_headingsSchema);
exports.default = Pre_Eng_Headings;
//# sourceMappingURL=Pre-EngineeringHeadings.js.map