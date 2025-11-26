import express from "express";
import { 
  initiatePayment,
  paymentNotify,
  checkPurchaseStatus,
  getUserPurchases,
} from "../application/paymentController";

const PaymentRouter = express.Router();

PaymentRouter
  .route("/initiate")
  .post(initiatePayment);

PaymentRouter
  .route("/notify")
  .post(paymentNotify);

PaymentRouter
  .route("/check/:contentId")
  .get(checkPurchaseStatus);

PaymentRouter
  .route("/user-purchases")
  .get(getUserPurchases);

export default PaymentRouter;