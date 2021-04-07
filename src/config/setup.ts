import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import routes from "../routes/index";
import errorHandler from "../utils/uncaught_error";
import asyncEerrorHandler from "../utils/async_error";

export default function (app: any) {
  app.use(helmet);
  app.use(compression);
  errorHandler();

  app.use(
    cors({
      origin: [process.env.CLIENT!],
      credentials: true,
    })
  );

  if (!process.env.JWT) {
    throw new Error("FATAL ERROR: jwtPrivateToken key not found");
  }

  routes(app);

  app.use(asyncEerrorHandler);
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
