// @ts-nocheck
import("express-async-errors");

export default function () {
  process.quit = () => {
    setTimeout(() => {
      process.exit(1);
    }, 300);
  };

  process.on("uncaughtException", (ex) => {
    console.log(ex);
    process.quit();
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
}
