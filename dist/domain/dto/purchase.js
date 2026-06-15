"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePurchaseDTO = void 0;
var zod_1 = require("zod");
var CreatePurchaseDTO = zod_1.z.object({
    userId: zod_1.z.string().min(1).optional(),
    username: zod_1.z.string().min(1).optional(),
    contentId: zod_1.z.string().min(1),
    amount: zod_1.z.number().min(0).optional(), // also changed min(1) to min(0) in case price is 0
    paidAt: zod_1.z.date().optional(),
});
exports.CreatePurchaseDTO = CreatePurchaseDTO;
//# sourceMappingURL=purchase.js.map