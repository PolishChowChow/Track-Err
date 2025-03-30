export default function headerChecker(req, res, next) {
  if (
    ["POST", "PUT", "PATCH"].includes(req.method) &&
    req.headers["content-type"] !== "application/json"
  ) {
    return res
      .status(415)
      .json({ error: "Only application/json content-type is allowed" });
  }
  next();
}
