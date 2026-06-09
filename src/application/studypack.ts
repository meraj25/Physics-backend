import StudyPack from "../infrastructure/db/entities/Studypack";
import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import { CreateStudyPackDTO } from "../domain/dto/studypack";
import NotFoundError from "../domain/errors/not-found-error";
import S3 from "../infrastructure/s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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

    const { heading, assignment,topic,pre_content, link, paymentstatus, price, thumbnail_url} = result.data;

    const studyPack = await StudyPack.create({
     
      heading ,
      assignment,
      topic,
      pre_content,
      paymentstatus,
      link,
      price: price || 0,
      thumbnail_url
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
export { getAllStudyPacks, createStudyPack, deleteStudyPack,uploadthumbnail };