

import { z } from "zod";


const CreatePapersDTO = z.object({

  topic: z.string().min(1),    
  year: z.string().min(1).optional(),
  paymentstatus: z.string().min(1),
  link: z.string().url().optional(),

});

export { CreatePapersDTO };