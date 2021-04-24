"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const auth_1 = __importDefault(require("./auth"));
const async_error_1 = __importDefault(require("../middlewares/async_error"));
function default_1(app) {
    app.get("/api", (req, res) => {
        res.send("Hi there, welcome to this API");
    });
    app.use("/api/users", user_1.default);
    app.use("/api/auth", auth_1.default);
    app.use(async_error_1.default);
}
exports.default = default_1;
