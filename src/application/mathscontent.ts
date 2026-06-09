import MathsContent from "../infrastructure/db/entities/MathsContent";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreateMathsDTO } from "../domain/dto/mathscontent";
import NotFoundError from "../domain/errors/not-found-error";
import S3 from "../infrastructure/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

    const { heading, assignment,topic,pre_content, link, paymentstatus, price,thumbnail_url } = result.data;

    const mathscontent = await MathsContent.create({
     
      heading ,
      assignment,
      topic,
      pre_content,
      paymentstatus,
      link,
      price: price || 0,
      thumbnail_url
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


export { getAllMathsContent, createMathsContent, deleteMathsContent ,uploadthumbnail};