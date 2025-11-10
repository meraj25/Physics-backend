"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var studypackSchema = new mongoose_1.default.Schema({
    heading: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Headings",
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
    paymentstatus: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
});
var StudyPack = mongoose_1.default.model("StudyPack", studypackSchema);
exports.default = StudyPack;
//# sourceMappingURL=Studypack.js.map