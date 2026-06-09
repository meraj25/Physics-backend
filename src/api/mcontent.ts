import  express  from "express";
import { getAllMcontent , createMcontent ,deleteMcontent,uploadthumbnail } from "../application/mcontent";


const McontentRouter = express.Router();

McontentRouter
  .route("/")
  .get(getAllMcontent)
  .post(createMcontent)
 
McontentRouter
  .route("/:id")
  .delete(deleteMcontent)

McontentRouter
  .route("/thumbnail")
  .post(uploadthumbnail)


export default McontentRouter;