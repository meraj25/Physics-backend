"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const papers_1 = require("../application/papers");
const PapersRouter = express_1.default.Router();
PapersRouter
    .route("/")
    .get(papers_1.getAllPapers)
    .post(papers_1.createPapers);
PapersRouter
    .route("/:id")
    .delete(papers_1.deletePapers);
PapersRouter
    .route("/thumbnail")
    .post(papers_1.uploadthumbnail);
exports.default = PapersRouter;
//# sourceMappingURL=papers.js.map