import Topic from "../infrastructure/db/entities/Topic";
import { Request, Response, NextFunction } from "express";

const getAllTopics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    next(error);
  }
};
export { getAllTopics };