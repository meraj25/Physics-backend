"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_1 = require("../application/category");
var CategoryRouter = express_1.default.Router();
CategoryRouter
    .route('/')
    .get(category_1.getAllCategories)
    .post(category_1.createCategory);
exports.default = CategoryRouter;
//# sourceMappingURL=category.js.map