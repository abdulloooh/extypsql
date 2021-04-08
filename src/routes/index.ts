import userRouter from "./user";
import asyncEerrorHandler from "../middlewares/async_error";

export default function (app: any) {
  app.get("/api", (req: any, res: any) => {
    res.send("Hi there, welcome to this API");
  });

  app.use("/api/users", userRouter);

  app.use(asyncEerrorHandler);
}
