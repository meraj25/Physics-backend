import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import Purchase from '../infrastructure/db/entities/Purchase';
import Content from '../infrastructure/db/entities/Content';
import MContent from '../infrastructure/db/entities/MContent';
import MathsContent from '../infrastructure/db/entities/MathsContent';
import PEContent from '../infrastructure/db/entities/PEContent';
import StudyPack from '../infrastructure/db/entities/Studypack';
import NotFoundError from '../domain/errors/not-found-error';
import ValidationError from '../domain/errors/validation-error';
import {getAuth} from "@clerk/express";

// PayHere configuration
const PAYHERE_MERCHANT_ID = process.env.PAYHERE_MERCHANT_ID || 'YOUR_MERCHANT_ID';
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'YOUR_MERCHANT_SECRET';
const PAYHERE_MODE = process.env.PAYHERE_MODE || 'live';

// Generate MD5 hash for PayHere
const generateHash = (
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string,
  merchantSecret: string
): string => {
  const hashedSecret = crypto
    .createHash('md5')
    .update(merchantSecret)
    .digest('hex')
    .toUpperCase();

  // Step 2: Create final hash using the hashed secret
  const hash = crypto
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
const initiatePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      

    const authObj = getAuth(req);
    

    const { contentId } = req.body;
    const { userId } = authObj;

 

    if (!userId) {
      throw new ValidationError('User not authenticated');
    }
    

    if (!contentId) {
      throw new ValidationError('Content ID is required');
    }

    // Try to find the content across multiple content collections/models
    const models: any[] = [Content, MContent, MathsContent, PEContent, StudyPack];
    let content: any = null;
    let contentSource: string | null = null;

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
   
    }

    if (!content) {
      throw new NotFoundError('Content not found');
    }

    if (content.paymentstatus?.toLowerCase() !== 'paid') {
      throw new ValidationError('This content is free');
    }

    const existingPurchase = await Purchase.findOne({
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

    const hash = generateHash(
      PAYHERE_MERCHANT_ID,
      orderId,
      amount.toFixed(2),
      currency,
      PAYHERE_MERCHANT_SECRET
    );
    console.log('🛒 Creating purchase...')
    const purchase = await Purchase.create({
      userId,
      contentId,
      amount,
      currency,
      orderId,
      status: 'pending',
    });
    console.log('✅ Purchase created:', purchase._id)

    res.status(200).json({
      orderId,
      amount,
      currency,
      hash,
      merchantId: PAYHERE_MERCHANT_ID,
      contentTopic: content.topic,
      purchaseId: purchase._id,
    });
  } catch (error) {
    next(error);
  }
};

// PayHere notify URL handler
const paymentNotify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig,
      payment_id,
      method,
    } = req.body;

    const hashedSecret = crypto
  .createHash('md5')
  .update(PAYHERE_MERCHANT_SECRET)
  .digest('hex')
  .toUpperCase();

const localHash = crypto
  .createHash('md5')
  .update(`${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`)
  .digest('hex')
  .toUpperCase();

    if (localHash !== md5sig) {
      console.error('Hash verification failed');
      return res.status(400).send('Invalid hash');
    }

    const purchase = await Purchase.findOne({ orderId: order_id });
    if (!purchase) {
      console.error('Purchase not found for order:', order_id);
      return res.status(404).send('Purchase not found');
    }

    if (status_code === '2') {
      purchase.status = 'completed';
      purchase.paymentId = payment_id;
      purchase.paymentMethod = method;
    } else if (status_code === '-1' || status_code === '-2' || status_code === '-3') {
      purchase.status = 'failed';
    }

    await purchase.save();

    res.status(200).send('OK');
  } catch (error) {
    console.error('Payment notify error:', error);
    next(error);
  }
};

// Check if user has purchased content
const checkPurchaseStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { contentId } = req.params;
     const {userId} = getAuth(req);


    if (!userId) {
      throw new ValidationError('User not authenticated');
    }

    const purchase = await Purchase.findOne({
      userId,
      contentId,
      status: 'completed',
    });

    res.status(200).json({
      purchased: !!purchase,
      purchaseDate: purchase?.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// Get all purchases for a user
const getUserPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
     const {userId} = getAuth(req);


    if (!userId) {
      throw new ValidationError('User not authenticated');
    }

    const purchases = await Purchase.find({
      userId,
      status: 'completed',
    }).populate('contentId');

    res.status(200).json(purchases);
  } catch (error) {
    next(error);
  }
};

export {
  initiatePayment,
  paymentNotify,
  checkPurchaseStatus,
  getUserPurchases,
};