import  express  from "express";
import { getAllMathsContent,createMathsContent,deleteMathsContent } from "../application/mathscontent";



const MathsContentRouter = express.Router();

MathsContentRouter
  .route("/")
  .get(getAllMathsContent)
  .post(createMathsContent);

MathsContentRouter
  .route("/:id")
  .delete(deleteMathsContent)
  



export default MathsContentRouter;
