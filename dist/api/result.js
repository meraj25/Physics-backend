"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var result_1 = require("../application/result");
var result_2 = require("../application/result");
var ResultRouter = express_1.default.Router();
ResultRouter
    .route('/')
    .get(result_1.GetResults)
    .post(result_2.AddResult);
exports.default = ResultRouter;
//# sourceMappingURL=result.js.map