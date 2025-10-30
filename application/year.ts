import Year from "../infrastructure/db/entities/Year";
import { Request, Response, NextFunction } from "express";

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
export { getAllYears };