import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { PrismaClient, User } from "@prisma/client";
const { JWT_SECRET } = process.env;
import jwt from "jsonwebtoken";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, password } = req.body;

  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not defined" });
  }

  if (!user || !password)
    return res.status(400).json({ error: "Missing data" });

  const prisma = new PrismaClient();
  const findUser: User | null = await prisma.user.findFirst({
    where: { name: user },
  });

  if (!findUser) {
    await prisma.$disconnect();
    return res.status(401).json({ error: "User not found" });
  }

  const matchPass = await bcrypt.compare(password, findUser.pass);

  if (!matchPass) {
    await prisma.$disconnect();
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: findUser.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      name: findUser.name,
      createdAt: findUser.createdAt,
    },
    JWT_SECRET
  );

  const serialized = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  });

  await prisma.$disconnect();
  res.setHeader("Set-Cookie", serialized);

  return res.status(200).json({ message: "success" });
}
