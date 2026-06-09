import MContent from "../infrastructure/db/entities/MContent";
import Purchase from "../infrastructure/db/entities/Purchase";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import CreateMcontentDTO from "../domain/dto/mcontent";
import { getAuth } from "@clerk/express";
import S3 from "../infrastructure/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const getAllMcontent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoryId = req.query.categoryId;
    const topicId = req.query.topicId;
    const yearId = req.query.yearId;
     const {userId} = getAuth(req);
 // Get userId from Clerk

    let mcontents;

    if (categoryId) {
      mcontents = await MContent.find({ categoryId });
    } else if (topicId) {
      mcontents = await MContent.find({ topicId });
    } else if (yearId) {
      mcontents = await MContent.find({ yearId });
    } else {
      mcontents = await MContent.find();
    }

    // If user is authenticated, check which paid content they've purchased
    if (userId) {
      const purchasedContentIds = await Purchase.find({
        userId,
        status: 'completed',
      }).distinct('contentId');

      // Add purchased flag to each content
      const mcontentsWithPurchaseStatus = mcontents.map((mcontent) => {
        const mcontentObj = mcontent.toObject();
        return {
          ...mcontentObj,
          isPurchased: purchasedContentIds.some(
            (id) => id.toString() === mcontent._id.toString()
          ),
        };
      });

      return res.json(mcontentsWithPurchaseStatus);
    }

    res.json(mcontents);
  } catch (error) {
    next(error);
  }
};

const createMcontent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = CreateMcontentDTO.safeParse(req.body);
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
      price ,
      thumbnail_url
    } = result.data;

    const mcontent = await MContent.create({
      yearId,
      categoryId,
      topic,
      assignment,
      link,
      description,
      pre_content,
      paymentstatus,
      price: price || 0,
      thumbnail_url
    });
    
    res.status(201).json(mcontent);
  } catch (error) {
    next(error);
  }
};

const deleteMcontent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedMcontent = await MContent.findByIdAndDelete(req.params.id);

    if (!deletedMcontent) {
      throw new NotFoundError("please select a valid content");
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    next(error);
  }
};
const uploadthumbnail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const { fileType } = body;
    
    const id = randomUUID();

    const url = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
        Key: id,
        ContentType: fileType,
      }),
      {
        expiresIn: 60,
      }
    );

    res
      .status(200)
      .json({
        url,
        publicURL: `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${id}`,
      });
  } catch (error) {
    next(error);
  }
};

export { 
  getAllMcontent , 
  createMcontent, 
  deleteMcontent ,
  uploadthumbnail 
};