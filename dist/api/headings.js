"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var headings_1 = require("../application/headings");
var headings_2 = require("../application/headings");
var HeadingsRouter = express_1.default.Router();
HeadingsRouter
    .route('/')
    .get(headings_1.getAllHeadings)
    .post(headings_2.createHeading);
exports.default = HeadingsRouter;
//# sourceMappingURL=headings.js.map