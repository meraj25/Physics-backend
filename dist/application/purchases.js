"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = exports.getAllPurchases = void 0;
const Purchases_1 = __importDefault(require("../infrastructure/db/entities/Purchases"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const getAllPurchases = async (req, res, next) => {
    try {
        const purchases = await Purchases_1.default.find();
        res.json(purchases);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPurchases = getAllPurchases;
const createPurchase = async (req, res, next) => {
    try {
        const newPurchases = req.body;
        if (!newPurchases.userId && !newPurchases.username) {
            throw new validation_error_1.default("Either userId or username is required");
        }
        const purchase = await Purchases_1.default.create({
            ...newPurchases,
            status: 'completed', // ← always completed when admin manually creates
        });
        res.status(201).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
exports.createPurchase = createPurchase;
//# sourceMappingURL=purchases.js.map