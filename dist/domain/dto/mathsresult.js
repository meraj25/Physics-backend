"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMathsResultDTO = void 0;
var zod_1 = require("zod");
var CreateMathsResultDTO = zod_1.z.object({
    contentId: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1).optional(),
    url: zod_1.z.string().url().optional(),
});
exports.CreateMathsResultDTO = CreateMathsResultDTO;
//# sourceMappingURL=mathsresult.js.map