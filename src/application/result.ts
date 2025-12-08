import Result from "../infrastructure/db/entities/Result";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const GetResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    next(error);
  }
};
const AddResult = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newResult = req.body;
    if (!newResult.contentId) {
      throw new ValidationError("Result contentId is required");
    }
    await Result.create(newResult);
    res.status(201).json(newResult);
  } catch (error) {
    next(error);
  }
};


export { GetResults, AddResult };