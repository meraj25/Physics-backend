import  express  from "express";
import { getAllMathsContent,createMathsContent,deleteMathsContent ,uploadthumbnail} from "../application/mathscontent";



const MathsContentRouter = express.Router();

MathsContentRouter
  .route("/")
  .get(getAllMathsContent)
  .post(createMathsContent);

MathsContentRouter
  .route("/:id")
  .delete(deleteMathsContent)

MathsContentRouter
  .route("/thumbnail")
  .post(uploadthumbnail)
  



export default MathsContentRouter;
