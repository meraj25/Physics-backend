"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pecontent_1 = require("../application/pecontent");
const PEContentRouter = express_1.default.Router();
PEContentRouter
    .route("/")
    .get(pecontent_1.getAllPEContent)
    .post(pecontent_1.createPEContent);
PEContentRouter
    .route("/:id")
    .delete(pecontent_1.deletePEContent);
PEContentRouter
    .route("/thumbnail")
    .post(pecontent_1.uploadthumbnail);
exports.default = PEContentRouter;
//# sourceMappingURL=pecontent.js.map