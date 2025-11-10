"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validation_error_1 = __importDefault(require("../../domain/errors/validation-error"));
var not_found_error_1 = __importDefault(require("../../domain/errors/not-found-error"));
var unauthorized_error_1 = __importDefault(require("../../domain/errors/unauthorized-error"));
var globalErrorHandlingMiddleware = function (err, req, res, next) {
    console.log("=== ERROR CAUGHT ===");
    console.log("Error name:", err.name);
    console.log("Error message:", err.message);
    console.log("Error stack:", err.stack);
    console.log("Full error:", err);
    if (err instanceof validation_error_1.default) {
        res.status(400).json({ message: err.message, error: err.message });
    }
    else if (err instanceof not_found_error_1.default) {
        res.status(404).json({ message: err.message });
    }
    else if (err instanceof unauthorized_error_1.default) {
        res.status(401).json({ message: err.message });
    }
    else {
        // Return the actual error message in development
        res.status(500).json({
            message: "Internal server error",
            error: err.message, // Add this for debugging
            details: err.toString() // Add this too
        });
    }
};
exports.default = globalErrorHandlingMiddleware;
//# sourceMappingURL=global-error-handling-middleware.js.map