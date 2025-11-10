"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.createContent = exports.getAllContent = void 0;
var Content_1 = __importDefault(require("../infrastructure/db/entities/Content"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var content_1 = require("../domain/dto/content");
var getAllContent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, topicId, yearId, contents, contents, contents, contents, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                categoryId = req.query.categoryId;
                topicId = req.query.topicId;
                yearId = req.query.yearId;
                if (!categoryId) return [3 /*break*/, 2];
                return [4 /*yield*/, Content_1.default.find({ categoryId: categoryId })];
            case 1:
                contents = _a.sent();
                res.json(contents);
                return [3 /*break*/, 8];
            case 2:
                if (!topicId) return [3 /*break*/, 4];
                return [4 /*yield*/, Content_1.default.find({ topicId: topicId })];
            case 3:
                contents = _a.sent();
                res.json(contents);
                return [3 /*break*/, 8];
            case 4:
                if (!yearId) return [3 /*break*/, 6];
                return [4 /*yield*/, Content_1.default.find({ yearId: yearId })];
            case 5:
                contents = _a.sent();
                res.json(contents);
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, Content_1.default.find()];
            case 7:
                contents = _a.sent();
                res.json(contents);
                _a.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getAllContent = getAllContent;
var createContent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, yearId, categoryId, topic, assignment, link, description, paymentstatus, content, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                result = content_1.CreateContentDTO.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default(result.error.message);
                }
                _a = result.data, yearId = _a.yearId, categoryId = _a.categoryId, topic = _a.topic, assignment = _a.assignment, link = _a.link, description = _a.description, paymentstatus = _a.paymentstatus;
                return [4 /*yield*/, Content_1.default.create({
                        yearId: yearId,
                        categoryId: categoryId,
                        topic: topic,
                        assignment: assignment,
                        link: link,
                        description: description,
                        paymentstatus: paymentstatus,
                    })];
            case 1:
                content = _b.sent();
                res.status(201).json(content);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createContent = createContent;
var deleteContent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteContent_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Content_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                deleteContent_1 = _a.sent();
                if (!deleteContent_1) {
                    throw new not_found_error_1.default("please select a valid content");
                }
                res.status(200).json({ message: "Content deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteContent = deleteContent;
//# sourceMappingURL=content.js.map