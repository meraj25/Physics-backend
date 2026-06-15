"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const year_1 = require("../application/year");
const YearRouter = express_1.default.Router();
YearRouter
    .route('/')
    .get(year_1.getAllYears)
    .post(year_1.createYear);
exports.default = YearRouter;
//# sourceMappingURL=year.js.map