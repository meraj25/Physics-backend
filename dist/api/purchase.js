"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchases_1 = require("../application/purchases");
const purchases_2 = require("../application/purchases");
const PurchasesRouter = express_1.default.Router();
PurchasesRouter
    .route('/')
    .get(purchases_1.getAllPurchases)
    .post(purchases_2.createPurchase);
exports.default = PurchasesRouter;
//# sourceMappingURL=purchase.js.map