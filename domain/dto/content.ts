
import { z } from "zod";


const CreateContentDTO = z.object({
  year: z.number().min(1),
  category: z.string().min(1),
  topic: z.string().min(1),
  link: z.string().url().optional(),
  assignment: z.string().min(1),
  description: z.string().min(1),
  payment: z.boolean().optional(),
});

export { CreateContentDTO };
