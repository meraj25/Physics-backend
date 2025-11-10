"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContentDTO = void 0;
var zod_1 = require("zod");
var CreateContentDTO = zod_1.z.object({
    yearId: zod_1.z.string().min(1),
    categoryId: zod_1.z.string().min(1),
    topic: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional(),
    assignment: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    paymentstatus: zod_1.z.string().min(1),
    createdAt: zod_1.z.date().optional(),
});
exports.CreateContentDTO = CreateContentDTO;
//# sourceMappingURL=content.js.map