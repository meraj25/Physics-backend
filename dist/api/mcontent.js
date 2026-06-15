"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mcontent_1 = require("../application/mcontent");
const McontentRouter = express_1.default.Router();
McontentRouter
    .route("/")
    .get(mcontent_1.getAllMcontent)
    .post(mcontent_1.createMcontent);
McontentRouter
    .route("/:id")
    .delete(mcontent_1.deleteMcontent);
McontentRouter
    .route("/thumbnail")
    .post(mcontent_1.uploadthumbnail);
exports.default = McontentRouter;
//# sourceMappingURL=mcontent.js.map