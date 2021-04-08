"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(res, message) {
    return res.status(400).send({
        success: false,
        message,
    });
}
exports.default = default_1;
