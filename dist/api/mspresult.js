"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mspresult_1 = require("../application/mspresult");
const mspresult_2 = require("../application/mspresult");
const MSPResultRouter = express_1.default.Router();
MSPResultRouter
    .route('/')
    .get(mspresult_1.GetResults)
    .post(mspresult_2.AddResult);
exports.default = MSPResultRouter;
//# sourceMappingURL=mspresult.js.map