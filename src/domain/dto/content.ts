import { z } from 'zod';

export const CreateContentDTO = z.object({
  yearId: z.string().min(1, 'Year ID is required'),
  categoryId: z.string().min(1, 'Category ID is required'),
  topic: z.string().min(1, 'Topic is required'),
  assignment: z.string().min(1, 'Assignment is required'),
  link: z.string().min(1, 'Link is required'),
  description: z.string().min(1, 'Description is required'),
  paymentstatus: z.string().min(1, 'Payment status is required'),
  price: z.number().min(0, 'Price must be a positive number').optional().default(0),
});

export type CreateContentDTOType = z.infer<typeof CreateContentDTO>;