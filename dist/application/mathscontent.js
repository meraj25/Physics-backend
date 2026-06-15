"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadthumbnail = exports.deleteMathsContent = exports.createMathsContent = exports.getAllMathsContent = void 0;
const MathsContent_1 = __importDefault(require("../infrastructure/db/entities/MathsContent"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const mathscontent_1 = require("../domain/dto/mathscontent");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const s3_1 = __importDefault(require("../infrastructure/s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const getAllMathsContent = async (req, res, next) => {
    try {
        const mathscontent = await MathsContent_1.default.find();
        res.json(mathscontent);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllMathsContent = getAllMathsContent;
const createMathsContent = async (req, res, next) => {
    try {
        const result = mathscontent_1.CreateMathsDTO.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const { heading, assignment, topic, pre_content, link, paymentstatus, price, thumbnail_url } = result.data;
        const mathscontent = await MathsContent_1.default.create({
            heading,
            assignment,
            topic,
            pre_content,
            paymentstatus,
            link,
            price: price || 0,
            thumbnail_url
        });
        res.status(201).json(mathscontent);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createMathsContent = createMathsContent;
const deleteMathsContent = async (req, res, next) => {
    try {
        const deleteMathsContent = await MathsContent_1.default.findByIdAndDelete(req.params.id);
        if (!deleteMathsContent) {
            throw new not_found_error_1.default("please select a valid maths content");
        }
        res.status(200).json({ message: "Maths content deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMathsContent = deleteMathsContent;
const uploadthumbnail = async (req, res, next) => {
    try {
        const body = req.body;
        const { fileType } = body;
        const id = (0, crypto_1.randomUUID)();
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.default, new client_s3_1.PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: id,
            ContentType: fileType,
        }), {
            expiresIn: 60,
        });
        res
            .status(200)
            .json({
            url,
            publicURL: `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${id}`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadthumbnail = uploadthumbnail;
//# sourceMappingURL=mathscontent.js.map