"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResult = exports.GetResults = void 0;
const Result_1 = __importDefault(require("../infrastructure/db/entities/Result"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const GetResults = async (req, res, next) => {
    try {
        const results = await Result_1.default.find();
        res.json(results);
    }
    catch (error) {
        next(error);
    }
};
exports.GetResults = GetResults;
const AddResult = async (req, res, next) => {
    try {
        const newResult = req.body;
        if (!newResult.contentId) {
            throw new validation_error_1.default("Result contentId is required");
        }
        await Result_1.default.create(newResult);
        res.status(201).json(newResult);
    }
    catch (error) {
        next(error);
    }
};
exports.AddResult = AddResult;
//# sourceMappingURL=result.js.map