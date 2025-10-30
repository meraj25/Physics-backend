import Category from "../infrastructure/db/entities/Category";
import { Request, Response, NextFunction } from "express";

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};


export { getAllCategories };