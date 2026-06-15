"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYear = exports.getAllYears = void 0;
const Year_1 = __importDefault(require("../infrastructure/db/entities/Year"));
const getAllYears = async (req, res, next) => {
    try {
        const years = await Year_1.default.find();
        res.json(years);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllYears = getAllYears;
const createYear = async (req, res, next) => {
    try {
        const newYear = req.body;
        await Year_1.default.create(newYear);
        res.status(201).json(newYear);
    }
    catch (error) {
        next(error);
    }
};
exports.createYear = createYear;
//# sourceMappingURL=year.js.map