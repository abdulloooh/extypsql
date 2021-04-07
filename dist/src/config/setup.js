"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const index_1 = __importDefault(require("../routes/index"));
const uncaught_error_1 = __importDefault(require("../utils/uncaught_error"));
const async_error_1 = __importDefault(require("../utils/async_error"));
function default_1(app) {
    app.use(helmet_1.default);
    app.use(compression_1.default);
    uncaught_error_1.default();
    app.use(cors_1.default({
        origin: [process.env.CLIENT],
        credentials: true,
    }));
    if (!process.env.JWT) {
        throw new Error("FATAL ERROR: jwtPrivateToken key not found");
    }
    index_1.default(app);
    app.use(async_error_1.default);
}
exports.default = default_1;
// const passport = require("passport");
// const passport_local = require("../passport/localStrategy");
// const passport_jwt = require("../passport/jwtStrategy");
// const passport_google = require("../passport/googleStrategy");
// app.use(passport.initialize());
// passport_local();
// passport_jwt();
// passport_google();
// if (!config.get("db")) {
//   throw new Error("FATAL ERROR: db not configured");
// }
