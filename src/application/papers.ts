import Paper from "../infrastructure/db/entities/Papers";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreatePapersDTO } from "../domain/dto/papers";
import NotFoundError from "../domain/errors/not-found-error";

const getAllPapers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const papers = await Paper.find();
    res.json(papers);
  } catch (error) {
    next(error);
  }
};

const createPapers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreatePapersDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { year,topic, link, paymentstatus } = result.data;

    const papers = await Paper.create({
     
      year,
      topic,
      paymentstatus,
      link
    });
    res.status(201).json(papers);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 const deletePapers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletePapers = await Paper.findByIdAndDelete(req.params.id);

        if (!deletePapers) {
            throw new NotFoundError("please select a valid papers");
        }

        res.status(200).json({ message: "Papers deleted successfully" });
    } 
    catch (error) 
    {
        next(error);
    }
};

export { getAllPapers, createPapers, deletePapers };