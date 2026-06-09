import Paper from "../infrastructure/db/entities/Papers";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreatePapersDTO } from "../domain/dto/papers";
import NotFoundError from "../domain/errors/not-found-error";
import S3 from "../infrastructure/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

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

    const { year,topic, link, paymentstatus,thumbnail_url, price } = result.data;

    const papers = await Paper.create({
     
      year,
      topic,
      paymentstatus,
      link,
      thumbnail_url,
      price,
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

export { getAllPapers, createPapers, deletePapers ,uploadthumbnail};