import { z } from "zod";


const CreatePurchaseDTO = z.object({
  userId: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  contentId: z.string().min(1),
  amount: z.number().min(0).optional(),  // also changed min(1) to min(0) in case price is 0
  paidAt: z.date().optional(),
})

export { CreatePurchaseDTO };