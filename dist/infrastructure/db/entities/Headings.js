"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var headingsSchema = new mongoose_1.default.Schema({
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
var Headings = mongoose_1.default.model("Headings", headingsSchema);
exports.default = Headings;
//# sourceMappingURL=Headings.js.map