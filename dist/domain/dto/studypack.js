"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudyPackDTO = void 0;
var zod_1 = require("zod");
var CreateStudyPackDTO = zod_1.z.object({
    heading: zod_1.z.string().min(1),
    assignment: zod_1.z.string().min(1),
    topic: zod_1.z.string().min(1).optional(),
    paymentstatus: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional(),
});
exports.CreateStudyPackDTO = CreateStudyPackDTO;
//# sourceMappingURL=studypack.js.map