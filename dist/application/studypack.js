"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadthumbnail = exports.deleteStudyPack = exports.createStudyPack = exports.getAllStudyPacks = void 0;
const Studypack_1 = __importDefault(require("../infrastructure/db/entities/Studypack"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const studypack_1 = require("../domain/dto/studypack");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const s3_1 = __importDefault(require("../infrastructure/s3"));
const crypto_1 = require("crypto");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const getAllStudyPacks = async (req, res, next) => {
    try {
        const studyPack = await Studypack_1.default.find();
        res.json(studyPack);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllStudyPacks = getAllStudyPacks;
const createStudyPack = async (req, res, next) => {
    try {
        const result = studypack_1.CreateStudyPackDTO.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const { heading, assignment, topic, pre_content, link, paymentstatus, price, thumbnail_url } = result.data;
        const studyPack = await Studypack_1.default.create({
            heading,
            assignment,
            topic,
            pre_content,
            paymentstatus,
            link,
            price: price || 0,
            thumbnail_url
        });
        res.status(201).json(studyPack);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.createStudyPack = createStudyPack;
const deleteStudyPack = async (req, res, next) => {
    try {
        const deleteStudyPack = await Studypack_1.default.findByIdAndDelete(req.params.id);
        if (!deleteStudyPack) {
            throw new not_found_error_1.default("please select a valid study pack");
        }
        res.status(200).json({ message: "Study pack deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteStudyPack = deleteStudyPack;
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
//# sourceMappingURL=studypack.js.map