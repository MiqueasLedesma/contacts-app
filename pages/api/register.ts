import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, password } = req.body;
  const saltRounds = 12;

  if (!user || !password) {
    return res.status(400).json({ error: "Missing data" });
  }

  const prisma = new PrismaClient();
  const findUser = await prisma.user.findFirst({
    where: {
      name: user,
    },
  });

  if (findUser) {
    return res.status(409).json({ error: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
      const createUser = await prisma.user.create({
        data: {
          name: user,
          pass: hashedPassword,
        },
      });
      return res.status(200).json(createUser);
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    } finally {
      await prisma.$disconnect();
    }
  }
}
