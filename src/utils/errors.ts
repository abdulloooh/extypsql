export function _400(res: any, message: string) {
  return res.status(400).send({
    success: false,
    message,
  });
}
