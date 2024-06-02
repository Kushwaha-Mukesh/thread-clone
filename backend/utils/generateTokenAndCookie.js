import jwt from "jsonwebtoken";
const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwtSecret, {
    expiresIn: "3d",
  });

  res.cookie("token", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndCookie;
