import { hash } from "argon2";
import db from "../models";
import { _400 } from "../utils/errors";

const User = db.user;
interface User {
  id?: string;
  username: string;
  password: string;
}

export async function getUser(req: any, res: any) {
  res.send("working...");
}

export async function registerUser(req: any, res: any) {
  const { username, password }: User = req.body;

  if (!username || !password) return _400(res, "username and password required");
  if (username.length < 3) return _400(res, "username must be minimum of three characters");
  if (password.length < 3) return _400(res, "username must be minimum of three characters");

  let usernameExists = await User.findOne({
    where: {
      username,
    },
  });

  if (usernameExists) {
    return _400(res, "An account with that username already exists!");
  }

  let newUser = await User.create({
    username,
    password: await hash(password),
  });
  return res.send(newUser);
}
