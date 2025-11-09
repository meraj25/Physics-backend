import Headings from "../infrastructure/db/entities/Headings";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";

const getAllHeadings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headings = await Headings.find();
    res.json(headings);
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
    await Headings.create(newHeading);
    res.status(201).json(newHeading);
  } catch (error) {
    next(error);
  }
};


export { getAllHeadings, createHeading };