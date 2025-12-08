import MathsResult from "../infrastructure/db/entities/MathsResult";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const GetResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mathsresults = await MathsResult.find();
    res.json(mathsresults);
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
    const newMathsResult = req.body;
    if (!newMathsResult.contentId) {
      throw new ValidationError("Result contentId is required");
    }
    await MathsResult.create(newMathsResult);
    res.status(201).json(newMathsResult);
  } catch (error) {
    next(error);
  }
};


export { GetResults, AddResult };