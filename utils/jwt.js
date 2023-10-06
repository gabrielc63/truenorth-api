import jwt from "jsonwebtoken";

function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
}

function decodeAccessToken(req) {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return payload;
}

function generateRefreshToken(user, jti) {
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

function generateTokens(user, jti) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  decodeAccessToken,
};
