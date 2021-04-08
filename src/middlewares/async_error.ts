import "express-async-errors";
export default function (err: any, req: any, res: any) {
  console.log(err.stack, err.message);

  res.status(err.status || 500).send({
    success: false,
    msg: /^[4]\d{2}$/.test(err.status) //intentionally thrown error mssgs
      ? err.message
      : "temporarily unavailable, please try again later",
  });
}
