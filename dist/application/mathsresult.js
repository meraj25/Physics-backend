"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResult = exports.GetResults = void 0;
const MathsResult_1 = __importDefault(require("../infrastructure/db/entities/MathsResult"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const GetResults = async (req, res, next) => {
    try {
        const mathsresults = await MathsResult_1.default.find();
        res.json(mathsresults);
    }
    catch (error) {
        next(error);
    }
};
exports.GetResults = GetResults;
const AddResult = async (req, res, next) => {
    try {
        const newMathsResult = req.body;
        if (!newMathsResult.contentId) {
            throw new validation_error_1.default("Result contentId is required");
        }
        await MathsResult_1.default.create(newMathsResult);
        res.status(201).json(newMathsResult);
    }
    catch (error) {
        next(error);
    }
};
exports.AddResult = AddResult;
//# sourceMappingURL=mathsresult.js.map