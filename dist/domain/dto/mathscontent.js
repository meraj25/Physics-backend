"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMathsDTO = void 0;
const zod_1 = require("zod");
const CreateMathsDTO = zod_1.z.object({
    heading: zod_1.z.string().min(1),
    assignment: zod_1.z.string().min(1),
    topic: zod_1.z.string().min(1).optional(),
    pre_content: zod_1.z.string().min(1),
    paymentstatus: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional(),
    price: zod_1.z.number().min(0, 'Price must be a positive number').optional().default(0),
    thumbnail_url: zod_1.z.string().min(1, 'Link is required'),
});
exports.CreateMathsDTO = CreateMathsDTO;
//# sourceMappingURL=mathscontent.js.map