"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const models_1 = __importDefault(require("../models"));
const index_1 = __importDefault(require("../routes/index"));
const uncaught_error_1 = __importDefault(require("../utils/uncaught_error"));
function default_1(app) {
    uncaught_error_1.default();
    app.use(helmet_1.default());
    app.use(compression_1.default());
    app.use(morgan_1.default("dev"));
    app.use(cookie_parser_1.default());
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ extended: false, limit: "50mb" }));
    app.use(cors_1.default({
        origin: [process.env.CLIENT],
        credentials: true,
    }));
    models_1.default.rest
        .authenticate()
        .then(() => console.log("database connected"))
        .catch((err) => console.log(err.message));
    if (!process.env.JWT) {
        throw new Error("FATAL ERROR: jwtPrivateToken key not found");
    }
    index_1.default(app);
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
