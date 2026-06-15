"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadthumbnail = exports.deleteMcontent = exports.createMcontent = exports.getAllMcontent = void 0;
const MContent_1 = __importDefault(require("../infrastructure/db/entities/MContent"));
const Purchase_1 = __importDefault(require("../infrastructure/db/entities/Purchase"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const mcontent_1 = __importDefault(require("../domain/dto/mcontent"));
const express_1 = require("@clerk/express");
const s3_1 = __importDefault(require("../infrastructure/s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
const getAllMcontent = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId;
        const topicId = req.query.topicId;
        const yearId = req.query.yearId;
        const { userId } = (0, express_1.getAuth)(req);
        // Get userId from Clerk
        let mcontents;
        if (categoryId) {
            mcontents = await MContent_1.default.find({ categoryId });
        }
        else if (topicId) {
            mcontents = await MContent_1.default.find({ topicId });
        }
        else if (yearId) {
            mcontents = await MContent_1.default.find({ yearId });
        }
        else {
            mcontents = await MContent_1.default.find();
        }
        // If user is authenticated, check which paid content they've purchased
        if (userId) {
            const purchasedContentIds = await Purchase_1.default.find({
                userId,
                status: 'completed',
            }).distinct('contentId');
            // Add purchased flag to each content
            const mcontentsWithPurchaseStatus = mcontents.map((mcontent) => {
                const mcontentObj = mcontent.toObject();
                return {
                    ...mcontentObj,
                    isPurchased: purchasedContentIds.some((id) => id.toString() === mcontent._id.toString()),
                };
            });
            return res.json(mcontentsWithPurchaseStatus);
        }
        res.json(mcontents);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllMcontent = getAllMcontent;
const createMcontent = async (req, res, next) => {
    try {
        const result = mcontent_1.default.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const { yearId, categoryId, topic, assignment, link, description, pre_content, paymentstatus, price, thumbnail_url } = result.data;
        const mcontent = await MContent_1.default.create({
            yearId,
            categoryId,
            topic,
            assignment,
            link,
            description,
            pre_content,
            paymentstatus,
            price: price || 0,
            thumbnail_url
        });
        res.status(201).json(mcontent);
    }
    catch (error) {
        next(error);
    }
};
exports.createMcontent = createMcontent;
const deleteMcontent = async (req, res, next) => {
    try {
        const deletedMcontent = await MContent_1.default.findByIdAndDelete(req.params.id);
        if (!deletedMcontent) {
            throw new not_found_error_1.default("please select a valid content");
        }
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteMcontent = deleteMcontent;
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
//# sourceMappingURL=mcontent.js.map