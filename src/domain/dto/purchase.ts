import { z } from "zod";


const CreatePurchaseDTO = z.object({
  userId: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  contentId: z.string().min(1),
  amount: z.number().min(1).optional(),
  paidAt: z.date().optional(),
}).refine((d) => d.userId || d.username, {
  message: "Either userId or username is required",
});

export { CreatePurchaseDTO };