import PEContent from "../infrastructure/db/entities/PEContent";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreatePEDTO } from "../domain/dto/pecontent";
import NotFoundError from "../domain/errors/not-found-error";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3 from "../infrastructure/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";


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

    const { heading, assignment,topic,pre_content, link, paymentstatus, price,thumbnail_url } = result.data;

    const pecontent = await PEContent.create({
     
      heading ,
      assignment,
      topic,
      pre_content,
      paymentstatus,
      link,
      price: price || 0,
      thumbnail_url
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
export { getAllPEContent, createPEContent, deletePEContent,uploadthumbnail };