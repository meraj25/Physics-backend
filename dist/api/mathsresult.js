"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mathsresult_1 = require("../application/mathsresult");
var mathsresult_2 = require("../application/mathsresult");
var MathsResultRouter = express_1.default.Router();
MathsResultRouter
    .route('/')
    .get(mathsresult_1.GetResults)
    .post(mathsresult_2.AddResult);
exports.default = MathsResultRouter;
//# sourceMappingURL=mathsresult.js.map