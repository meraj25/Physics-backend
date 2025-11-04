import Category from "../infrastructure/db/entities/Category";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

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
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = req.body;
    if (!newCategory.name) {
      throw new ValidationError("Category name is required");
    }
    await Category.create(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};


export { getAllCategories, createCategory };