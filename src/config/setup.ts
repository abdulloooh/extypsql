import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";

import db from "../models";
import routes from "../routes/index";
import errorHandler from "../utils/uncaught_error";

export default function (app: any) {
  errorHandler();
  app.use(helmet());
  app.use(compression());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: false, limit: "50mb" }));

  app.use(
    cors({
      origin: [process.env.CLIENT!],
      credentials: true,
    })
  );

  db.sequelize
    .authenticate()
    .then(() => console.log("database connected"))
    .catch((err: any) => console.log(err.message));

  if (!process.env.JWT) {
    throw new Error("FATAL ERROR: jwtPrivateToken key not found");
  }

  routes(app);
}

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
