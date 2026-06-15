"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mathscontent_1 = require("../application/mathscontent");
var MathsContentRouter = express_1.default.Router();
MathsContentRouter
    .route("/")
    .get(mathscontent_1.getAllMathsContent)
    .post(mathscontent_1.createMathsContent);
MathsContentRouter
    .route("/:id")
    .delete(mathscontent_1.deleteMathsContent);
MathsContentRouter
    .route("/thumbnail")
    .post(mathscontent_1.uploadthumbnail);
exports.default = MathsContentRouter;
//# sourceMappingURL=mathscontent.js.map