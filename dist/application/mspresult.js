"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResult = exports.GetResults = void 0;
const MSPResult_1 = __importDefault(require("../infrastructure/db/entities/MSPResult"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const GetResults = async (req, res, next) => {
    try {
        const mspresults = await MSPResult_1.default.find();
        res.json(mspresults);
    }
    catch (error) {
        next(error);
    }
};
exports.GetResults = GetResults;
const AddResult = async (req, res, next) => {
    try {
        const newMSPResult = req.body;
        if (!newMSPResult.contentId) {
            throw new validation_error_1.default("Result contentId is required");
        }
        await MSPResult_1.default.create(newMSPResult);
        res.status(201).json(newMSPResult);
    }
    catch (error) {
        next(error);
    }
};
exports.AddResult = AddResult;
//# sourceMappingURL=mspresult.js.map