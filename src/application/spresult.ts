import SPResult from "../infrastructure/db/entities/SPResult";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const GetResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const spresults = await SPResult.find();
    res.json(spresults);
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
    const newSPResult = req.body;
    if (!newSPResult.contentId) {
      throw new ValidationError("Result contentId is required");
    }
    await SPResult.create(newSPResult);
    res.status(201).json(newSPResult);
  } catch (error) {
    next(error);
  }
};


export { GetResults, AddResult };