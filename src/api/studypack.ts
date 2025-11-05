import  express  from "express";
import { getAllStudyPacks,createStudyPack, deleteStudyPack } from "../application/studypack";



const StudyPackRouter = express.Router();

StudyPackRouter
  .route("/")
  .get(getAllStudyPacks)
  .post(createStudyPack)
  .delete(deleteStudyPack);



export default StudyPackRouter;
