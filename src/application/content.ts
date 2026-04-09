import Content from "../infrastructure/db/entities/Content";
import Purchase from "../infrastructure/db/entities/Purchase";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import  CreateContentDTO  from "../domain/dto/content";
import { getAuth } from "@clerk/express";

const getAllContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.query.categoryId;
    const topicId = req.query.topicId;
    const yearId = req.query.yearId;
     const {userId} = getAuth(req);
 // Get userId from Clerk

    let contents;

    if (categoryId) {
      contents = await Content.find({ categoryId });
    } else if (topicId) {
      contents = await Content.find({ topicId });
    } else if (yearId) {
      contents = await Content.find({ yearId });
    } else {
      contents = await Content.find();
    }

    // If user is authenticated, check which paid content they've purchased
    if (userId) {
      const purchasedContentIds = await Purchase.find({
        userId,
        status: 'completed',
      }).distinct('contentId');

      // Add purchased flag to each content
      const contentsWithPurchaseStatus = contents.map((content) => {
        const contentObj = content.toObject();
        return {
          ...contentObj,
          isPurchased: purchasedContentIds.some(
            (id) => id.toString() === content._id.toString()
          ),
        };
      });

      return res.json(contentsWithPurchaseStatus);
    }

    res.json(contents);
  } catch (error) {
    next(error);
  }
};

const createContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreateContentDTO.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(result.error.message);
    }

    const { 
      yearId, 
      categoryId, 
      topic, 
      assignment, 
      link, 
      description, 
      pre_content,
      paymentstatus,
      price 
    } = result.data;

    const content = await Content.create({
      yearId,
      categoryId,
      topic,
      assignment,
      link,
      description,
      pre_content,
      paymentstatus,
      price: price || 0,
    });
    
    res.status(201).json(content);
  } catch (error) {
    next(error);
  }
};

const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedContent = await Content.findByIdAndDelete(req.params.id);

    if (!deletedContent) {
      throw new NotFoundError("please select a valid content");
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { 
  getAllContent, 
  createContent, 
  deleteContent 
};