"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudyPackDTO = void 0;
var zod_1 = require("zod");
var CreateStudyPackDTO = zod_1.z.object({
    heading: zod_1.z.string().min(1),
    assignment: zod_1.z.string().min(1),
    topic: zod_1.z.string().min(1).optional(),
    pre_content: zod_1.z.string().min(1),
    paymentstatus: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional(),
    price: zod_1.z.number().min(0, 'Price must be a positive number').optional().default(0),
    thumbnail_url: zod_1.z.string().min(1, 'Link is required'),
});
exports.CreateStudyPackDTO = CreateStudyPackDTO;
//# sourceMappingURL=studypack.js.map