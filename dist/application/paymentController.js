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
exports.getUserPurchases = exports.checkPurchaseStatus = exports.paymentNotify = exports.initiatePayment = void 0;
var crypto_1 = __importDefault(require("crypto"));
var Purchase_1 = __importDefault(require("../infrastructure/db/entities/Purchase"));
var Content_1 = __importDefault(require("../infrastructure/db/entities/Content"));
var MContent_1 = __importDefault(require("../infrastructure/db/entities/MContent"));
var MathsContent_1 = __importDefault(require("../infrastructure/db/entities/MathsContent"));
var PEContent_1 = __importDefault(require("../infrastructure/db/entities/PEContent"));
var Studypack_1 = __importDefault(require("../infrastructure/db/entities/Studypack"));
var not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
var validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
var express_1 = require("@clerk/express");
// PayHere configuration
var PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
var PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'YOUR_MERCHANT_SECRET';
var PAYHERE_MODE = process.env.PAYHERE_MODE || 'sandbox';
// Generate MD5 hash for PayHere
var generateHash = function (merchantId, orderId, amount, currency, merchantSecret) {
    var hashedSecret = crypto_1.default
        .createHash('md5')
        .update(merchantSecret)
        .digest('hex')
        .toUpperCase();
    // Step 2: Create final hash using the hashed secret
    var hash = crypto_1.default
        .createHash('md5')
        .update("".concat(merchantId).concat(orderId).concat(amount).concat(currency).concat(hashedSecret))
        .digest('hex')
        .toUpperCase();
    // Debug logging
    console.log('🔐 Hash Generation Debug:');
    console.log('Merchant ID:', merchantId);
    console.log('Order ID:', orderId);
    console.log('Amount:', amount);
    console.log('Currency:', currency);
    console.log('Hashed Secret:', hashedSecret.substring(0, 10) + '...');
    console.log('Final Hash:', hash);
    return hash;
};
// Initiate payment
var initiatePayment = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var contentId, userId, models, content, contentSource, _i, models_1, Model, doc, existingPurchase, amount, currency, orderId, hash, purchase, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                contentId = req.body.contentId;
                userId = (0, express_1.getAuth)(req).userId;
                console.log('📦 initiatePayment called');
                console.log('contentId:', contentId);
                console.log('userId:', userId);
                if (!userId) {
                    throw new validation_error_1.default('User not authenticated');
                }
                if (!contentId) {
                    throw new validation_error_1.default('Content ID is required');
                }
                models = [Content_1.default, MContent_1.default, MathsContent_1.default, PEContent_1.default, Studypack_1.default];
                content = null;
                contentSource = null;
                _i = 0, models_1 = models;
                _b.label = 1;
            case 1:
                if (!(_i < models_1.length)) return [3 /*break*/, 4];
                Model = models_1[_i];
                return [4 /*yield*/, Model.findById(contentId)];
            case 2:
                doc = _b.sent();
                if (doc) {
                    content = doc;
                    // modelName exists on Mongoose models; fall back to collection name
                    contentSource = (Model && (Model.modelName || (Model.collection && Model.collection.name))) || null;
                    return [3 /*break*/, 4];
                }
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (content) {
                    console.log('✅ Content found:', content.topic);
                    console.log('💰 paymentstatus:', content.paymentstatus);
                    console.log('💵 price:', content.price);
                }
                if (!content) {
                    throw new not_found_error_1.default('Content not found');
                }
                if (((_a = content.paymentstatus) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'paid') {
                    throw new validation_error_1.default('This content is free');
                }
                return [4 /*yield*/, Purchase_1.default.findOne({
                        userId: userId,
                        contentId: contentId,
                        status: 'completed',
                    })];
            case 5:
                existingPurchase = _b.sent();
                if (existingPurchase) {
                    return [2 /*return*/, res.status(200).json({
                            alreadyPurchased: true,
                            message: 'You have already purchased this content',
                        })];
                }
                amount = content.price || 1000;
                currency = 'LKR';
                orderId = "ORDER_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
                hash = generateHash(PAYHERE_MERCHANT_ID, orderId, amount.toFixed(2), currency, PAYHERE_MERCHANT_SECRET);
                console.log('🛒 Creating purchase...');
                return [4 /*yield*/, Purchase_1.default.create({
                        userId: userId,
                        contentId: contentId,
                        amount: amount,
                        currency: currency,
                        orderId: orderId,
                        status: 'pending',
                    })];
            case 6:
                purchase = _b.sent();
                console.log('✅ Purchase created:', purchase._id);
                res.status(200).json({
                    orderId: orderId,
                    amount: amount,
                    currency: currency,
                    hash: hash,
                    merchantId: PAYHERE_MERCHANT_ID,
                    contentTopic: content.topic,
                    purchaseId: purchase._id,
                });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                next(error_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.initiatePayment = initiatePayment;
// PayHere notify URL handler
var paymentNotify = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig, payment_id, method, hashedSecret, localHash, purchase, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, merchant_id = _a.merchant_id, order_id = _a.order_id, payhere_amount = _a.payhere_amount, payhere_currency = _a.payhere_currency, status_code = _a.status_code, md5sig = _a.md5sig, payment_id = _a.payment_id, method = _a.method;
                hashedSecret = crypto_1.default
                    .createHash('md5')
                    .update(PAYHERE_MERCHANT_SECRET)
                    .digest('hex')
                    .toUpperCase();
                localHash = crypto_1.default
                    .createHash('md5')
                    .update("".concat(merchant_id).concat(order_id).concat(payhere_amount).concat(payhere_currency).concat(status_code).concat(hashedSecret))
                    .digest('hex')
                    .toUpperCase();
                if (localHash !== md5sig) {
                    console.error('Hash verification failed');
                    return [2 /*return*/, res.status(400).send('Invalid hash')];
                }
                return [4 /*yield*/, Purchase_1.default.findOne({ orderId: order_id })];
            case 1:
                purchase = _b.sent();
                if (!purchase) {
                    console.error('Purchase not found for order:', order_id);
                    return [2 /*return*/, res.status(404).send('Purchase not found')];
                }
                if (status_code === '2') {
                    purchase.status = 'completed';
                    purchase.paymentId = payment_id;
                    purchase.paymentMethod = method;
                }
                else if (status_code === '-1' || status_code === '-2' || status_code === '-3') {
                    purchase.status = 'failed';
                }
                return [4 /*yield*/, purchase.save()];
            case 2:
                _b.sent();
                res.status(200).send('OK');
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                console.error('Payment notify error:', error_2);
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.paymentNotify = paymentNotify;
// Check if user has purchased content
var checkPurchaseStatus = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var contentId, userId, purchase, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                contentId = req.params.contentId;
                userId = (0, express_1.getAuth)(req).userId;
                if (!userId) {
                    throw new validation_error_1.default('User not authenticated');
                }
                return [4 /*yield*/, Purchase_1.default.findOne({
                        userId: userId,
                        contentId: contentId,
                        status: 'completed',
                    })];
            case 1:
                purchase = _a.sent();
                res.status(200).json({
                    purchased: !!purchase,
                    purchaseDate: purchase === null || purchase === void 0 ? void 0 : purchase.createdAt,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                next(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkPurchaseStatus = checkPurchaseStatus;
// Get all purchases for a user
var getUserPurchases = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, purchases, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = (0, express_1.getAuth)(req).userId;
                if (!userId) {
                    throw new validation_error_1.default('User not authenticated');
                }
                return [4 /*yield*/, Purchase_1.default.find({
                        userId: userId,
                        status: 'completed',
                    }).populate('contentId')];
            case 1:
                purchases = _a.sent();
                res.status(200).json(purchases);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserPurchases = getUserPurchases;
//# sourceMappingURL=paymentController.js.map