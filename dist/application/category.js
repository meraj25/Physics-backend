"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../infrastructure/db/entities/Category"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category_1.default.find();
        res.json(categories);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        if (!newCategory.name) {
            throw new validation_error_1.default("Category name is required");
        }
        await Category_1.default.create(newCategory);
        res.status(201).json(newCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
//# sourceMappingURL=category.js.map