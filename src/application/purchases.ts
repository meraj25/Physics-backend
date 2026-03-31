import Purchases from "../infrastructure/db/entities/Purchases";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const getAllPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchases = await   Purchases.find();
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};
const createPurchase = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newPurchases = req.body;
    if (!newPurchases.userId && !newPurchases.username) {
      throw new ValidationError("Either userId or username is required");
    }
    const purchase = await Purchases.create({
      ...newPurchases,
      status: 'completed', // ← always completed when admin manually creates
    });
    res.status(201).json(purchase);
  } catch (error) {
    next(error);
  }
};


export { getAllPurchases, createPurchase };