import  express  from "express";
import { getAllPapers,createPapers,deletePapers } from "../application/papers";



const PapersRouter = express.Router();

PapersRouter
  .route("/")
  .get(getAllPapers)
  .post(createPapers);

PapersRouter
  .route("/:id")
  .delete(deletePapers)
  



export default PapersRouter;
