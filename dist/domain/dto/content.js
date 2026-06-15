"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateContentDTO = zod_1.z.object({
    yearId: zod_1.z.string().min(1, 'Year ID is required'),
    categoryId: zod_1.z.string().min(1, 'Category ID is required'),
    topic: zod_1.z.string().min(1, 'Topic is required'),
    assignment: zod_1.z.string().min(1, 'Assignment is required'),
    link: zod_1.z.string().min(1, 'Link is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
    pre_content: zod_1.z.string().min(1, 'Pre-content is required'),
    paymentstatus: zod_1.z.string().min(1, 'Payment status is required'),
    price: zod_1.z.number().min(0, 'Price must be a positive number').optional().default(0),
    thumbnail_url: zod_1.z.string().min(1, 'Link is required'),
});
exports.default = CreateContentDTO;
//# sourceMappingURL=content.js.map