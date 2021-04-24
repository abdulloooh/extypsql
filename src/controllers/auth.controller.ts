import { hash } from "argon2";
import db from "../models";
import { _400 } from "../utils/errors";
import type { CreateUser } from "../config/interfaces";

const User = db.user;

/**
 * @desc login
 * @route POST /api/auth/login
 * @access Public
 */
export async function login(req: any, res: any) {
  const { username, password }: CreateUser = req.body;

  if (!username || !password) return _400(res, "username or password incorrect");

  let user = await User.findOne({ where: { username } });
  if (!user) return _400(res, "user not found");

  const isValid = await user.isValidPass(password);
  if (!isValid) return _400(res, "incorrect username or password");

  console.log(user);
  res.send(user.transformEntity());
}
