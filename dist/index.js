"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./infrastructure/db"));
const content_1 = __importDefault(require("./api/content"));
const category_1 = __importDefault(require("./api/category"));
const headings_1 = __importDefault(require("./api/headings"));
const year_1 = __importDefault(require("./api/year"));
const global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
const studypack_1 = __importDefault(require("./api/studypack"));
const headings_2 = __importDefault(require("./api/headings"));
const maths_headings_1 = __importDefault(require("./api/maths_headings"));
const pre_eng_headings_1 = __importDefault(require("./api/pre_eng_headings"));
const pecontent_1 = __importDefault(require("./api/pecontent"));
const papers_1 = __importDefault(require("./api/papers"));
const mathscontent_1 = __importDefault(require("./api/mathscontent"));
const mcontent_1 = __importDefault(require("./api/mcontent"));
const result_1 = __importDefault(require("./api/result"));
const mathsresult_1 = __importDefault(require("./api/mathsresult"));
const spresult_1 = __importDefault(require("./api/spresult"));
const mspresult_1 = __importDefault(require("./api/mspresult"));
const peresult_1 = __importDefault(require("./api/peresult"));
const payment_1 = __importDefault(require("./api/payment"));
const purchase_1 = __importDefault(require("./api/purchase"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@clerk/express");
console.log('CLERK_SECRET_KEY:', process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET');
console.log('CLERK_PUBLISHABLE_KEY:', process.env.CLERK_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('ENV CHECK:', {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    PAYHERE_MERCHANT_ID: process.env.PAYHERE_MERCHANT_ID,
    PAYHERE_MERCHANT_SECRET: process.env.PAYHERE_MERCHANT_SECRET,
    PAYHERE_MODE: process.env.PAYHERE_MODE,
    CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
    CLOUDFLARE_BUCKET_NAME: process.env.CLOUDFLARE_BUCKET_NAME,
    CLOUDFLARE_PUBLIC_DOMAIN: process.env.CLOUDFLARE_PUBLIC_DOMAIN,
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "https://sanjayasuriya.online",
}));
app.use((0, express_2.clerkMiddleware)());
app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
});
app.use('/api/contents', content_1.default);
app.use('/api/categories', category_1.default);
app.use('/api/topics', headings_1.default);
app.use('/api/years', year_1.default);
app.use('/api/studyPacks', studypack_1.default);
app.use('/api/headings', headings_2.default);
app.use('/api/payments', payment_1.default);
app.use('/api/pre_eng_headings', pre_eng_headings_1.default);
app.use('/api/maths_headings', maths_headings_1.default);
app.use('/api/pecontents', pecontent_1.default);
app.use('/api/papers', papers_1.default);
app.use('/api/mathscontents', mathscontent_1.default);
app.use('/api/mcontents', mcontent_1.default);
app.use('/api/results', result_1.default);
app.use('/api/mathsresults', mathsresult_1.default);
app.use('/api/spresults', spresult_1.default);
app.use('/api/mspresults', mspresult_1.default);
app.use('/api/peresults', peresult_1.default);
app.use('/api/purchases', purchase_1.default);
app.use(global_error_handling_middleware_1.default);
(0, db_1.default)();
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
//# sourceMappingURL=index.js.map