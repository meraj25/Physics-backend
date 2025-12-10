import { z } from "zod";


const CreatePurchaseDTO = z.object({

  userId: z.string().min(1),   
  contentId: z.string().min(1), 
  amount: z.number().min(1).optional(),
  paidAt: z.date().optional(),

});

export { CreatePurchaseDTO };