import PEResult from "../infrastructure/db/entities/PEResult";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const GetResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const peresults = await PEResult.find();
    res.json(peresults);
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
    const newPEResult = req.body;
    if (!newPEResult.contentId) {
      throw new ValidationError("Result contentId is required");
    }
    await PEResult.create(newPEResult);
    res.status(201).json(newPEResult);
  } catch (error) {
    next(error);
  }
};


export { GetResults, AddResult };