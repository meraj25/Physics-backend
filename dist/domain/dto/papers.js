"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePapersDTO = void 0;
const zod_1 = require("zod");
const CreatePapersDTO = zod_1.z.object({
    topic: zod_1.z.string().min(1),
    year: zod_1.z.string().min(1).optional(),
    paymentstatus: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional(),
    thumbnail_url: zod_1.z.string().min(1, 'Link is required'),
    price: zod_1.z.number().min(0, 'Price must be a positive number').optional().default(0),
});
exports.CreatePapersDTO = CreatePapersDTO;
//# sourceMappingURL=papers.js.map