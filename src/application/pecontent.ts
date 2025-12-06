import PEContent from "../infrastructure/db/entities/PEContent";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreatePEDTO } from "../domain/dto/pecontent";
import NotFoundError from "../domain/errors/not-found-error";


const getAllPEContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pecontent = await PEContent.find();
    res.json(pecontent);
  } catch (error) {
    next(error);
  }
};

const createPEContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreatePEDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { heading, assignment,topic, link, paymentstatus } = result.data;

    const pecontent = await PEContent.create({
     
      heading ,
      assignment,
      topic,
      paymentstatus,
      link
    });
    res.status(201).json(pecontent);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 const deletePEContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletePEContent = await PEContent.findByIdAndDelete(req.params.id);

        if (!deletePEContent) {
            throw new NotFoundError("please select a valid PE content");
        }

        res.status(200).json({ message: "PE content deleted successfully" });
    } 
    catch (error) 
    {
        next(error);
    }
};

export { getAllPEContent, createPEContent, deletePEContent };