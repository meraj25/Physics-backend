
import { create } from "domain";
import { z } from "zod";


const CreateStudyPackDTO = z.object({

  heading: z.string().min(1),    
  assignment: z.string().min(1),
  topic: z.string().min(1).optional(),
  pre_content: z.string().min(1),
  paymentstatus: z.string().min(1),
  link: z.string().url().optional(),
  price: z.number().min(0, 'Price must be a positive number').optional().default(0),

});

export { CreateStudyPackDTO };
