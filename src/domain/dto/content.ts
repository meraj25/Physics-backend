
import { z } from "zod";


const CreateContentDTO = z.object({
  yearId: z.string().min(1),
  categoryId: z.string().min(1),
  topic: z.string().min(1),
  link: z.string().url().optional(),
  assignment: z.string().min(1),
  description: z.string().min(1),
  paymentstatus: z.string().min(1),
});

export { CreateContentDTO };
