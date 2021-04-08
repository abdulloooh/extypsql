"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._400 = void 0;
function _400(res, message) {
    return res.status(400).send({
        success: false,
        message,
    });
}
exports._400 = _400;
