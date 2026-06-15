"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadthumbnail = exports.deletePapers = exports.createPapers = exports.getAllPapers = void 0;
const Papers_1 = __importDefault(require("../infrastructure/db/entities/Papers"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const papers_1 = require("../domain/dto/papers");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const s3_1 = __importDefault(require("../infrastructure/s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
const getAllPapers = async (req, res, next) => {
    try {
        const papers = await Papers_1.default.find();
        res.json(papers);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllPapers = getAllPapers;
const createPapers = async (req, res, next) => {
    try {
        const result = papers_1.CreatePapersDTO.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const { year, topic, link, paymentstatus, thumbnail_url, price } = result.data;
        const papers = await Papers_1.default.create({
            year,
            topic,
            paymentstatus,
            link,
            thumbnail_url,
            price,
        });
        res.status(201).json(papers);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createPapers = createPapers;
const deletePapers = async (req, res, next) => {
    try {
        const deletePapers = await Papers_1.default.findByIdAndDelete(req.params.id);
        if (!deletePapers) {
            throw new not_found_error_1.default("please select a valid papers");
        }
        res.status(200).json({ message: "Papers deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePapers = deletePapers;
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
//# sourceMappingURL=papers.js.map