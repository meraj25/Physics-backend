"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMSPResultDTO = void 0;
const zod_1 = require("zod");
const CreateMSPResultDTO = zod_1.z.object({
    contentId: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1).optional(),
    url: zod_1.z.string().url().optional(),
});
exports.CreateMSPResultDTO = CreateMSPResultDTO;
//# sourceMappingURL=mspresult.js.map