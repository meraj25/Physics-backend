import Content from "../infrastructure/db/entities/Content";
import { Request, Response,NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { CreateContentDTO } from "../domain/dto/content";

const getAllContent = async(req: Request, res: Response, next: NextFunction) =>{

    try {
        const categoryId = req.query.categoryId;
        const topicId = req.query.topicId;
        const yearId = req.query.yearId;
        if (categoryId) {
          const contents = await Content.find({ categoryId});
          res.json(contents);
        } else if (topicId) {
          const contents = await Content.find({ topicId });
          res.json(contents);
        } else if (yearId) {
          const contents = await Content.find({ yearId });
          res.json(contents);
        } else {
          const contents = await Content.find();
          res.json(contents);
        }
    } 
    catch (error) 
    {
        next(error);
    }


};

const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const result = CreateContentDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { yearId, categoryId, topic, assignment, link, description, paymentstatus } = result.data;

   

    const content = await Content.create({
      yearId,
      categoryId,
      topic,
      assignment,
      link,
      description,
      paymentstatus,
      
    });
    res.status(201).json(content);
  }
    catch (error) 
    {
        next(error);
    }
};

    const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteContent = await Content.findByIdAndDelete(req.params.id);

        if (!deleteContent) {
            throw new NotFoundError("please select a valid content");
        }

        res.status(200).json({ message: "Content deleted successfully" });
    } 
    catch (error) 
    {
        next(error);
    }
};

export { getAllContent,
         createContent,
         deleteContent
        };
