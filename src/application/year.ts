import Year from "../infrastructure/db/entities/Year";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const getAllYears = async (
  req: Request,
  res: Response,    
  next: NextFunction
) => {
  try {
    const years = await Year.find();
    res.json(years);
  } catch (error) {
    next(error);
  }
};

const createYear = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newYear = req.body;
    
    await Year.create(newYear);
    res.status(201).json(newYear);
  } catch (error) {
    next(error);
  }
};
export { getAllYears, createYear };