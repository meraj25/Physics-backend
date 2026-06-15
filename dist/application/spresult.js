"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResult = exports.GetResults = void 0;
const SPResult_1 = __importDefault(require("../infrastructure/db/entities/SPResult"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const GetResults = async (req, res, next) => {
    try {
        const spresults = await SPResult_1.default.find();
        res.json(spresults);
    }
    catch (error) {
        next(error);
    }
};
exports.GetResults = GetResults;
const AddResult = async (req, res, next) => {
    try {
        const newSPResult = req.body;
        if (!newSPResult.contentId) {
            throw new validation_error_1.default("Result contentId is required");
        }
        await SPResult_1.default.create(newSPResult);
        res.status(201).json(newSPResult);
    }
    catch (error) {
        next(error);
    }
};
exports.AddResult = AddResult;
//# sourceMappingURL=spresult.js.map