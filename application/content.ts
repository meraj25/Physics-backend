import Content from "../infrastructure/db/entities/Content";
import { Request, Response,NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";

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
        
        const newContent = req.body;
        if(!newContent.categoryId) {
            throw new ValidationError("Category ID is required");
        }
         if(!newContent.yearId) {
            throw new ValidationError("Year ID is required");
        }
         if(!newContent.topicId) {
            throw new ValidationError("Topic ID is required");
        }
        

        await Content.create(newContent);
        res.status(201).json(newContent);

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
