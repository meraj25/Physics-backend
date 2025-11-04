import { link } from "fs";
import { z } from "zod";


const CreateStudyPackDTO = z.object({
  heading: z.string().min(1),
  subheading: z.string().min(1),    
  assignment: z.string().min(1),
  link: z.string().url().optional(),
  payment: z.boolean().optional(),
});

export { CreateStudyPackDTO };
