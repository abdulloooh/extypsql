"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(err, req, res) {
    console.log(err);
    res.status(err.status || 500).send({
        success: false,
        msg: /^[4]\d{2}$/.test(err.status) //intentionally thrown error mssgs
            ? err.message
            : "temporarily unavailable, please try again later",
    });
}
exports.default = default_1;
