import { z } from "zod";


const CreateSPResultDTO = z.object({

  contentId: z.string().min(1),    
  username: z.string().min(1).optional(),
  url: z.string().url().optional(),

});

export { CreateSPResultDTO };