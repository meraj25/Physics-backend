import  express  from "express";
import { getAllMcontent , createMcontent ,deleteMcontent } from "../application/mcontent";


const McontentRouter = express.Router();

McontentRouter
  .route("/")
  .get(getAllMcontent)
  .post(createMcontent)
 
McontentRouter
  .route("/:id")
  .delete(deleteMcontent)


export default McontentRouter;