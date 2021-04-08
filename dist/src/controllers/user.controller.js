"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getUser = void 0;
const argon2_1 = require("argon2");
const models_1 = __importDefault(require("../models"));
const errors_1 = require("../utils/errors");
const User = models_1.default.user;
/**
 * @desc Get single user
 * @route GET /api/users/me
 * @access Public
 */
async function getUser(req, res) {
    res.send("working...");
}
exports.getUser = getUser;
/**
 * @desc Register
 * @route POST /api/users/register
 * @access Public
 */
async function registerUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return errors_1._400(res, "username and password required");
    if (username.length < 3)
        return errors_1._400(res, "username must be minimum of three characters");
    if (password.length < 3)
        return errors_1._400(res, "username must be minimum of three characters");
    let usernameExists = await User.findOne({
        where: {
            username,
        },
    });
    if (usernameExists) {
        return errors_1._400(res, "An account with that username already exists!");
    }
    let newUser = await User.create({
        username,
        password: await argon2_1.hash(password),
    });
    return res.send(newUser);
}
exports.registerUser = registerUser;
