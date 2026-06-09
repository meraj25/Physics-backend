import  express  from "express";
import { getAllStudyPacks,createStudyPack, deleteStudyPack ,uploadthumbnail} from "../application/studypack";



const StudyPackRouter = express.Router();

StudyPackRouter
  .route("/")
  .get(getAllStudyPacks)
  .post(createStudyPack);

StudyPackRouter
  .route("/:id")
  .delete(deleteStudyPack)

StudyPackRouter
  .route("/thumbnail")
  .post(uploadthumbnail)
  



export default StudyPackRouter;
