import  express  from "express";
import { getAllPEContent,createPEContent,deletePEContent } from "../application/pecontent";



const PEContentRouter = express.Router();

PEContentRouter
  .route("/")
  .get(getAllPEContent)
  .post(createPEContent);
PEContentRouter
  .route("/:id")
  .delete(deletePEContent)
  



export default PEContentRouter;
