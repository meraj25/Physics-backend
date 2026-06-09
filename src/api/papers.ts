import  express  from "express";
import { getAllPapers,createPapers,deletePapers,uploadthumbnail } from "../application/papers";



const PapersRouter = express.Router();

PapersRouter
  .route("/")
  .get(getAllPapers)
  .post(createPapers);

PapersRouter
  .route("/:id")
  .delete(deletePapers)

PapersRouter
  .route("/thumbnail")
  .post(uploadthumbnail)
  



export default PapersRouter;
