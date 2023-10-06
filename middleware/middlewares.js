import jwt from "jsonwebtoken";

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  console.error(err);
  res.status(statusCode);
  res.json({
    message: err.message,
    timestamp: err.timestamp || undefined,
    stack: process.env.NODE_ENV !== "production" ? err.stack : "",
  });
}

function isAuthenticated(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("Un-Authorized");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("Un-Authorized");
  }

  return next();
}

export { errorHandler, isAuthenticated };
