import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";
const { JWT_SECRET } = process.env;

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!JWT_SECRET)
    return res.status(500).json({ error: "JWT_SECRET is not loaded" });

  const { token } = req.cookies;
  if (!token) return res.status(401).json({ error: "You must be logged in" });
  try {
    verify(token, JWT_SECRET);

    const serialized = serialize("token", "", {
      httpOnly: true, // no se puede acceder desde el front
      secure: process.env.NODE_ENV === "production", // solo en produccion
      sameSite: "strict", // solo desde la misma url
      maxAge: 0, // 0 dias
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({ message: "You are logged out" });
  } catch (error) {
    return res.status(401).json({ error: "You must be logged in" });
  }
}
