"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPurchases = exports.checkPurchaseStatus = exports.paymentNotify = exports.initiatePayment = void 0;
const crypto_1 = __importDefault(require("crypto"));
const Purchase_1 = __importDefault(require("../infrastructure/db/entities/Purchase"));
const Content_1 = __importDefault(require("../infrastructure/db/entities/Content"));
const MContent_1 = __importDefault(require("../infrastructure/db/entities/MContent"));
const MathsContent_1 = __importDefault(require("../infrastructure/db/entities/MathsContent"));
const PEContent_1 = __importDefault(require("../infrastructure/db/entities/PEContent"));
const Studypack_1 = __importDefault(require("../infrastructure/db/entities/Studypack"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const express_1 = require("@clerk/express");
// PayHere configuration
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'YOUR_MERCHANT_SECRET';
const PAYHERE_MODE = process.env.PAYHERE_MODE || 'live';
// Generate MD5 hash for PayHere
const generateHash = (merchantId, orderId, amount, currency, merchantSecret) => {
    const hashedSecret = crypto_1.default
        .createHash('md5')
        .update(merchantSecret)
        .digest('hex')
        .toUpperCase();
    // Step 2: Create final hash using the hashed secret
    const hash = crypto_1.default
        .createHash('md5')
        .update(`${merchantId}${orderId}${amount}${currency}${hashedSecret}`)
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
const initiatePayment = async (req, res, next) => {
    try {
        console.log('🔑 Auth header:', req.headers.authorization?.substring(0, 30));
        console.log('🔑 getAuth result:', JSON.stringify((0, express_1.getAuth)(req)));
        const { contentId } = req.body;
        const { userId } = (0, express_1.getAuth)(req);
        console.log('📦 initiatePayment called');
        console.log('contentId:', contentId);
        console.log('userId:', userId);
        if (!userId) {
            throw new validation_error_1.default('User not authenticated');
        }
        if (!contentId) {
            throw new validation_error_1.default('Content ID is required');
        }
        // Try to find the content across multiple content collections/models
        const models = [Content_1.default, MContent_1.default, MathsContent_1.default, PEContent_1.default, Studypack_1.default];
        let content = null;
        let contentSource = null;
        for (const Model of models) {
            // @ts-ignore - dynamic model lookup
            const doc = await Model.findById(contentId);
            if (doc) {
                content = doc;
                // modelName exists on Mongoose models; fall back to collection name
                contentSource = (Model && (Model.modelName || (Model.collection && Model.collection.name))) || null;
                break;
            }
        }
        if (content) {
            console.log('✅ Content found:', content.topic);
            console.log('💰 paymentstatus:', content.paymentstatus);
            console.log('💵 price:', content.price);
        }
        if (!content) {
            throw new not_found_error_1.default('Content not found');
        }
        if (content.paymentstatus?.toLowerCase() !== 'paid') {
            throw new validation_error_1.default('This content is free');
        }
        const existingPurchase = await Purchase_1.default.findOne({
            userId,
            contentId,
            status: 'completed',
        });
        if (existingPurchase) {
            return res.status(200).json({
                alreadyPurchased: true,
                message: 'You have already purchased this content',
            });
        }
        const amount = content.price || 1000;
        const currency = 'LKR';
        const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const hash = generateHash(PAYHERE_MERCHANT_ID, orderId, amount.toFixed(2), currency, PAYHERE_MERCHANT_SECRET);
        console.log('🛒 Creating purchase...');
        const purchase = await Purchase_1.default.create({
            userId,
            contentId,
            amount,
            currency,
            orderId,
            status: 'pending',
        });
        console.log('✅ Purchase created:', purchase._id);
        res.status(200).json({
            orderId,
            amount,
            currency,
            hash,
            merchantId: PAYHERE_MERCHANT_ID,
            contentTopic: content.topic,
            purchaseId: purchase._id,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.initiatePayment = initiatePayment;
// PayHere notify URL handler
const paymentNotify = async (req, res, next) => {
    try {
        const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig, payment_id, method, } = req.body;
        const hashedSecret = crypto_1.default
            .createHash('md5')
            .update(PAYHERE_MERCHANT_SECRET)
            .digest('hex')
            .toUpperCase();
        const localHash = crypto_1.default
            .createHash('md5')
            .update(`${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`)
            .digest('hex')
            .toUpperCase();
        if (localHash !== md5sig) {
            console.error('Hash verification failed');
            return res.status(400).send('Invalid hash');
        }
        const purchase = await Purchase_1.default.findOne({ orderId: order_id });
        if (!purchase) {
            console.error('Purchase not found for order:', order_id);
            return res.status(404).send('Purchase not found');
        }
        if (status_code === '2') {
            purchase.status = 'completed';
            purchase.paymentId = payment_id;
            purchase.paymentMethod = method;
        }
        else if (status_code === '-1' || status_code === '-2' || status_code === '-3') {
            purchase.status = 'failed';
        }
        await purchase.save();
        res.status(200).send('OK');
    }
    catch (error) {
        console.error('Payment notify error:', error);
        next(error);
    }
};
exports.paymentNotify = paymentNotify;
// Check if user has purchased content
const checkPurchaseStatus = async (req, res, next) => {
    try {
        const { contentId } = req.params;
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            throw new validation_error_1.default('User not authenticated');
        }
        const purchase = await Purchase_1.default.findOne({
            userId,
            contentId,
            status: 'completed',
        });
        res.status(200).json({
            purchased: !!purchase,
            purchaseDate: purchase?.createdAt,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.checkPurchaseStatus = checkPurchaseStatus;
// Get all purchases for a user
const getUserPurchases = async (req, res, next) => {
    try {
        const { userId } = (0, express_1.getAuth)(req);
        if (!userId) {
            throw new validation_error_1.default('User not authenticated');
        }
        const purchases = await Purchase_1.default.find({
            userId,
            status: 'completed',
        }).populate('contentId');
        res.status(200).json(purchases);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserPurchases = getUserPurchases;
//# sourceMappingURL=paymentController.js.map