"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const models_1 = __importDefault(require("../models"));
const errors_1 = require("../utils/errors");
const User = models_1.default.user;
/**
 * @desc login
 * @route POST /api/auth/login
 * @access Public
 */
async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return errors_1._400(res, "username or password incorrect");
    let user = await User.findOne({ where: { username } });
    if (!user)
        return errors_1._400(res, "user not found");
    const isValid = await user.isValidPass(password);
    if (!isValid)
        return errors_1._400(res, "incorrect username or password");
    console.log(user);
    res.send(user.transformEntity());
}
exports.login = login;
