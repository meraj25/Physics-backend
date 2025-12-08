import MSPResult from "../infrastructure/db/entities/MSPResult";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const GetResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mspresults = await MSPResult.find();
    res.json(mspresults);
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
    const newMSPResult = req.body;
    if (!newMSPResult.contentId) {
      throw new ValidationError("Result contentId is required");
    }
    await MSPResult.create(newMSPResult);
    res.status(201).json(newMSPResult);
  } catch (error) {
    next(error);
  }
};


export { GetResults, AddResult };