"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateResultDTO = void 0;
const zod_1 = require("zod");
const CreateResultDTO = zod_1.z.object({
    contentId: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1).optional(),
    url: zod_1.z.string().url().optional(),
});
exports.CreateResultDTO = CreateResultDTO;
//# sourceMappingURL=result.js.map