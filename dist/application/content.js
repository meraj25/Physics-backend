"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadthumbnail = exports.deleteContent = exports.createContent = exports.getAllContent = void 0;
const Content_1 = __importDefault(require("../infrastructure/db/entities/Content"));
const Purchase_1 = __importDefault(require("../infrastructure/db/entities/Purchase"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const content_1 = __importDefault(require("../domain/dto/content"));
const express_1 = require("@clerk/express");
const crypto_1 = require("crypto");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = __importDefault(require("../infrastructure/s3"));
const getAllContent = async (req, res, next) => {
    try {
        const categoryId = req.query.categoryId;
        const topicId = req.query.topicId;
        const yearId = req.query.yearId;
        const { userId } = (0, express_1.getAuth)(req);
        // Get userId from Clerk
        let contents;
        if (categoryId) {
            contents = await Content_1.default.find({ categoryId });
        }
        else if (topicId) {
            contents = await Content_1.default.find({ topicId });
        }
        else if (yearId) {
            contents = await Content_1.default.find({ yearId });
        }
        else {
            contents = await Content_1.default.find();
        }
        // If user is authenticated, check which paid content they've purchased
        if (userId) {
            const purchasedContentIds = await Purchase_1.default.find({
                userId,
                status: 'completed',
            }).distinct('contentId');
            // Add purchased flag to each content
            const contentsWithPurchaseStatus = contents.map((content) => {
                const contentObj = content.toObject();
                return {
                    ...contentObj,
                    isPurchased: purchasedContentIds.some((id) => id.toString() === content._id.toString()),
                };
            });
            return res.json(contentsWithPurchaseStatus);
        }
        res.json(contents);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllContent = getAllContent;
const createContent = async (req, res, next) => {
    try {
        const result = content_1.default.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const { yearId, categoryId, topic, assignment, link, description, pre_content, paymentstatus, price, thumbnail_url } = result.data;
        const content = await Content_1.default.create({
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
        res.status(201).json(content);
    }
    catch (error) {
        next(error);
    }
};
exports.createContent = createContent;
const deleteContent = async (req, res, next) => {
    try {
        const deletedContent = await Content_1.default.findByIdAndDelete(req.params.id);
        if (!deletedContent) {
            throw new not_found_error_1.default("please select a valid content");
        }
        res.status(200).json({ message: "Content deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteContent = deleteContent;
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
//# sourceMappingURL=content.js.map