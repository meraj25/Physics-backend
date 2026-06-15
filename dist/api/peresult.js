"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const peresult_1 = require("../application/peresult");
const peresult_2 = require("../application/peresult");
const PEResultRouter = express_1.default.Router();
PEResultRouter
    .route('/')
    .get(peresult_1.GetResults)
    .post(peresult_2.AddResult);
exports.default = PEResultRouter;
//# sourceMappingURL=peresult.js.map