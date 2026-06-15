"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pre_eng_headings_1 = require("../application/pre_eng_headings");
var Pre_Eng_HeadingsRouter = express_1.default.Router();
Pre_Eng_HeadingsRouter
    .route('/')
    .get(pre_eng_headings_1.getAllHeadings)
    .post(pre_eng_headings_1.createHeading);
exports.default = Pre_Eng_HeadingsRouter;
//# sourceMappingURL=pre_eng_headings.js.map