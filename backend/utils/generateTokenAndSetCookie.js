import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  }); // payload / secret / options

  res.cookie("token", token, {
    httpOnly: true, // XSS attack protection
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // csrf attack protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
