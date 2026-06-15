"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResult = exports.GetResults = void 0;
const PEResult_1 = __importDefault(require("../infrastructure/db/entities/PEResult"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const GetResults = async (req, res, next) => {
    try {
        const peresults = await PEResult_1.default.find();
        res.json(peresults);
    }
    catch (error) {
        next(error);
    }
};
exports.GetResults = GetResults;
const AddResult = async (req, res, next) => {
    try {
        const newPEResult = req.body;
        if (!newPEResult.contentId) {
            throw new validation_error_1.default("Result contentId is required");
        }
        await PEResult_1.default.create(newPEResult);
        res.status(201).json(newPEResult);
    }
    catch (error) {
        next(error);
    }
};
exports.AddResult = AddResult;
//# sourceMappingURL=peresult.js.map