"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.uploadthumbnail = exports.deleteMcontent = exports.createMcontent = exports.getAllMcontent = void 0;
var MContent_1 = __importDefault(require("../infrastructure/db/entities/MContent"));
var Purchase_1 = __importDefault(require("../infrastructure/db/entities/Purchase"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var mcontent_1 = __importDefault(require("../domain/dto/mcontent"));
var express_1 = require("@clerk/express");
var s3_1 = __importDefault(require("../infrastructure/s3"));
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var crypto_1 = require("crypto");
var getAllMcontent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId, topicId, yearId, userId, mcontents, purchasedContentIds_1, mcontentsWithPurchaseStatus, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 11, , 12]);
                categoryId = req.query.categoryId;
                topicId = req.query.topicId;
                yearId = req.query.yearId;
                userId = (0, express_1.getAuth)(req).userId;
                mcontents = void 0;
                if (!categoryId) return [3 /*break*/, 2];
                return [4 /*yield*/, MContent_1.default.find({ categoryId: categoryId })];
            case 1:
                mcontents = _a.sent();
                return [3 /*break*/, 8];
            case 2:
                if (!topicId) return [3 /*break*/, 4];
                return [4 /*yield*/, MContent_1.default.find({ topicId: topicId })];
            case 3:
                mcontents = _a.sent();
                return [3 /*break*/, 8];
            case 4:
                if (!yearId) return [3 /*break*/, 6];
                return [4 /*yield*/, MContent_1.default.find({ yearId: yearId })];
            case 5:
                mcontents = _a.sent();
                return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, MContent_1.default.find()];
            case 7:
                mcontents = _a.sent();
                _a.label = 8;
            case 8:
                if (!userId) return [3 /*break*/, 10];
                return [4 /*yield*/, Purchase_1.default.find({
                        userId: userId,
                        status: 'completed',
                    }).distinct('contentId')];
            case 9:
                purchasedContentIds_1 = _a.sent();
                mcontentsWithPurchaseStatus = mcontents.map(function (mcontent) {
                    var mcontentObj = mcontent.toObject();
                    return __assign(__assign({}, mcontentObj), { isPurchased: purchasedContentIds_1.some(function (id) { return id.toString() === mcontent._id.toString(); }) });
                });
                return [2 /*return*/, res.json(mcontentsWithPurchaseStatus)];
            case 10:
                res.json(mcontents);
                return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
exports.getAllMcontent = getAllMcontent;
var createMcontent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, yearId, categoryId, topic, assignment, link, description, pre_content, paymentstatus, price, thumbnail_url, mcontent, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                result = mcontent_1.default.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default(result.error.message);
                }
                _a = result.data, yearId = _a.yearId, categoryId = _a.categoryId, topic = _a.topic, assignment = _a.assignment, link = _a.link, description = _a.description, pre_content = _a.pre_content, paymentstatus = _a.paymentstatus, price = _a.price, thumbnail_url = _a.thumbnail_url;
                return [4 /*yield*/, MContent_1.default.create({
                        yearId: yearId,
                        categoryId: categoryId,
                        topic: topic,
                        assignment: assignment,
                        link: link,
                        description: description,
                        pre_content: pre_content,
                        paymentstatus: paymentstatus,
                        price: price || 0,
                        thumbnail_url: thumbnail_url
                    })];
            case 1:
                mcontent = _b.sent();
                res.status(201).json(mcontent);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createMcontent = createMcontent;
var deleteMcontent = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedMcontent, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, MContent_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                deletedMcontent = _a.sent();
                if (!deletedMcontent) {
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
exports.deleteMcontent = deleteMcontent;
var uploadthumbnail = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var body, fileType, id, url, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                fileType = body.fileType;
                id = (0, crypto_1.randomUUID)();
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3_1.default, new client_s3_1.PutObjectCommand({
                        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
                        Key: id,
                        ContentType: fileType,
                    }), {
                        expiresIn: 60,
                    })];
            case 1:
                url = _a.sent();
                res
                    .status(200)
                    .json({
                    url: url,
                    publicURL: "".concat(process.env.CLOUDFLARE_PUBLIC_DOMAIN, "/").concat(id),
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uploadthumbnail = uploadthumbnail;
//# sourceMappingURL=mcontent.js.map