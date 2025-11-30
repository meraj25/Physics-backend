import Pre_Eng_Headings from "../infrastructure/db/entities/Pre-EngineeringHeadings";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const getAllHeadings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pre_eng_headings = await Pre_Eng_Headings.find();
    res.json(pre_eng_headings);
  } catch (error) {
    next(error);
  }
};
const createHeading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newHeading = req.body;
    if (!newHeading.name) {
      throw new ValidationError("Heading name is required");
    }
    await Pre_Eng_Headings.create(newHeading);
    res.status(201).json(newHeading);
  } catch (error) {
    next(error);
  }
};


export { getAllHeadings, createHeading };