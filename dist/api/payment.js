"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = require("../application/paymentController");
const PaymentRouter = express_1.default.Router();
PaymentRouter
    .route("/initiate")
    .post(paymentController_1.initiatePayment);
PaymentRouter
    .route("/notify")
    .post(paymentController_1.paymentNotify);
PaymentRouter
    .route("/check/:contentId")
    .get(paymentController_1.checkPurchaseStatus);
PaymentRouter
    .route("/user-purchases")
    .get(paymentController_1.getUserPurchases);
exports.default = PaymentRouter;
//# sourceMappingURL=payment.js.map