"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const result_1 = require("../application/result");
const result_2 = require("../application/result");
const ResultRouter = express_1.default.Router();
ResultRouter
    .route('/')
    .get(result_1.GetResults)
    .post(result_2.AddResult);
exports.default = ResultRouter;
//# sourceMappingURL=result.js.map