

import { z } from "zod";


const CreatePapersDTO = z.object({

  topic: z.string().min(1),    
  year: z.string().min(1).optional(),
  paymentstatus: z.string().min(1),
  link: z.string().url().optional(),
  thumbnail_url: z.string().min(1, 'Link is required'),
  price: z.number().min(0, 'Price must be a positive number').optional().default(0),

});

export { CreatePapersDTO };