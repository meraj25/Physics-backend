import StudyPack from "../infrastructure/db/entities/Studypack";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreateStudyPackDTO } from "../domain/dto/studypack";
import NotFoundError from "../domain/errors/not-found-error";

const getAllStudyPacks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studyPack = await StudyPack.find();
    res.json(studyPack);
  } catch (error) {
    next(error);
  }
};

const createStudyPack = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreateStudyPackDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { heading, assignment,topic, link, paymentstatus } = result.data;

    const studyPack = await StudyPack.create({
     
      heading ,
      assignment,
      topic,
      paymentstatus,
      link
    });
    res.status(201).json(studyPack);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
 const deleteStudyPack = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteStudyPack = await StudyPack.findByIdAndDelete(req.params.id);

        if (!deleteStudyPack) {
            throw new NotFoundError("please select a valid study pack");
        }

        res.status(200).json({ message: "Study pack deleted successfully" });
    } 
    catch (error) 
    {
        next(error);
    }
};

export { getAllStudyPacks, createStudyPack, deleteStudyPack };