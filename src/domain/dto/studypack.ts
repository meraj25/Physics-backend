
import { create } from "domain";
import { z } from "zod";


const CreateStudyPackDTO = z.object({

  heading: z.string().min(1),    
  assignment: z.string().min(1),
  topic: z.string().min(1).optional(),
  paymentstatus: z.string().min(1),
  link: z.string().url().optional(),

});

export { CreateStudyPackDTO };
