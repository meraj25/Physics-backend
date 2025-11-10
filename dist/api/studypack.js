"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var studypack_1 = require("../application/studypack");
var StudyPackRouter = express_1.default.Router();
StudyPackRouter
    .route("/")
    .get(studypack_1.getAllStudyPacks)
    .post(studypack_1.createStudyPack);
StudyPackRouter
    .route("/:id")
    .delete(studypack_1.deleteStudyPack);
exports.default = StudyPackRouter;
//# sourceMappingURL=studypack.js.map