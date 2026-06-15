"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var spresult_1 = require("../application/spresult");
var spresult_2 = require("../application/spresult");
var SPResultRouter = express_1.default.Router();
SPResultRouter
    .route('/')
    .get(spresult_1.GetResults)
    .post(spresult_2.AddResult);
exports.default = SPResultRouter;
//# sourceMappingURL=spresult.js.map