"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var content_1 = require("../application/content");
var ContentRouter = express_1.default.Router();
ContentRouter
    .route("/")
    .get(content_1.getAllContent)
    .post(content_1.createContent);
ContentRouter
    .route("/:id")
    .delete(content_1.deleteContent);
exports.default = ContentRouter;
//# sourceMappingURL=content.js.map