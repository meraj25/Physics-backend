"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHeading = exports.getAllHeadings = void 0;
const Headings_1 = __importDefault(require("../infrastructure/db/entities/Headings"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const getAllHeadings = async (req, res, next) => {
    try {
        const headings = await Headings_1.default.find();
        res.json(headings);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllHeadings = getAllHeadings;
const createHeading = async (req, res, next) => {
    try {
        const newHeading = req.body;
        if (!newHeading.name) {
            throw new validation_error_1.default("Heading name is required");
        }
        await Headings_1.default.create(newHeading);
        res.status(201).json(newHeading);
    }
    catch (error) {
        next(error);
    }
};
exports.createHeading = createHeading;
//# sourceMappingURL=headings.js.map