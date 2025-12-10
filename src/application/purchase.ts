import Purchase from "../infrastructure/db/entities/Purchase";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const getAllPurchases = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    next(error);
  }
};
const createPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPurchase = req.body;
    if (!newPurchase.name) {
      throw new ValidationError("Heading name is required");
    }
    await Purchase.create(newPurchase);
    res.status(201).json(newPurchase);
  } catch (error) {
    next(error);
  }
};


export { getAllPurchases, createPurchase };