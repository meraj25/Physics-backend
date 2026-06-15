"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var maths_headings_1 = require("../application/maths_headings");
var Maths_HeadingsRouter = express_1.default.Router();
Maths_HeadingsRouter
    .route('/')
    .get(maths_headings_1.getAllHeadings)
    .post(maths_headings_1.createHeading);
exports.default = Maths_HeadingsRouter;
//# sourceMappingURL=maths_headings.js.map