"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
function default_1(app) {
    app.get("/api", (req, res) => {
        res.send("Hi there, welcome to this API");
    });
    app.use("/api/users", user_1.default);
}
exports.default = default_1;
