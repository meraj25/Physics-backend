"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mathsheadingsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    main: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
});
const Maths_Headings = mongoose_1.default.model("Maths_Headings", mathsheadingsSchema);
exports.default = Maths_Headings;
//# sourceMappingURL=MathsHeadings.js.map