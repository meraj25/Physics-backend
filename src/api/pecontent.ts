import  express  from "express";
import { getAllPEContent,createPEContent,deletePEContent ,uploadthumbnail} from "../application/pecontent";



const PEContentRouter = express.Router();

PEContentRouter
  .route("/")
  .get(getAllPEContent)
  .post(createPEContent);
PEContentRouter
  .route("/:id")
  .delete(deletePEContent)

PEContentRouter
  .route("/thumbnail")
  .post(uploadthumbnail)
  



export default PEContentRouter;
