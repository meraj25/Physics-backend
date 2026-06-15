"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var pre_eng_headingsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
});
var Pre_Eng_Headings = mongoose_1.default.model("Pre_Eng_Headings", pre_eng_headingsSchema);
exports.default = Pre_Eng_Headings;
//# sourceMappingURL=Pre-EngineeringHeadings.js.map