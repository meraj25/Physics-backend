
import { z } from "zod";


const CreateStudyPackDTO = z.object({

  heading: z.string().min(1),    
  assignment: z.string().min(1),
  link: z.string().url().optional(),
  paymentstatus: z.string().min(1),
});

export { CreateStudyPackDTO };
