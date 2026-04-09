import MathsContent from "../infrastructure/db/entities/MathsContent";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreateMathsDTO } from "../domain/dto/mathscontent";
import NotFoundError from "../domain/errors/not-found-error";

const getAllMathsContent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const mathscontent = await MathsContent.find();
    res.json(mathscontent);
  } catch (error) {
    next(error);
  }
};

const createMathsContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreateMathsDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { heading, assignment,topic,pre_content, link, paymentstatus, price } = result.data;

    const mathscontent = await MathsContent.create({
     
      heading ,
      assignment,
      topic,
      pre_content,
      paymentstatus,
      link,
      price: price || 0,
    });
    res.status(201).json(mathscontent);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 const deleteMathsContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteMathsContent = await MathsContent.findByIdAndDelete(req.params.id);

        if (!deleteMathsContent) {
            throw new NotFoundError("please select a valid maths content");
        }

        res.status(200).json({ message: "Maths content deleted successfully" });
    } 
    catch (error) 
    {
        next(error);
    }
};

export { getAllMathsContent, createMathsContent, deleteMathsContent };