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
exports.uploadthumbnail = exports.deletePapers = exports.createPapers = exports.getAllPapers = void 0;
var Papers_1 = __importDefault(require("../infrastructure/db/entities/Papers"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var papers_1 = require("../domain/dto/papers");
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var s3_1 = __importDefault(require("../infrastructure/s3"));
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var crypto_1 = require("crypto");
var getAllPapers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var papers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Papers_1.default.find()];
            case 1:
                papers = _a.sent();
                res.json(papers);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllPapers = getAllPapers;
var createPapers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, year, topic, link, paymentstatus, thumbnail_url, price, papers, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                result = papers_1.CreatePapersDTO.safeParse(req.body);
                if (!result.success) {
                    throw new validation_error_1.default(result.error.message);
                }
                _a = result.data, year = _a.year, topic = _a.topic, link = _a.link, paymentstatus = _a.paymentstatus, thumbnail_url = _a.thumbnail_url, price = _a.price;
                return [4 /*yield*/, Papers_1.default.create({
                        year: year,
                        topic: topic,
                        paymentstatus: paymentstatus,
                        link: link,
                        thumbnail_url: thumbnail_url,
                        price: price,
                    })];
            case 1:
                papers = _b.sent();
                res.status(201).json(papers);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.log(error_2);
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPapers = createPapers;
var deletePapers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deletePapers_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Papers_1.default.findByIdAndDelete(req.params.id)];
            case 1:
                deletePapers_1 = _a.sent();
                if (!deletePapers_1) {
                    throw new not_found_error_1.default("please select a valid papers");
                }
                res.status(200).json({ message: "Papers deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePapers = deletePapers;
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
//# sourceMappingURL=papers.js.map