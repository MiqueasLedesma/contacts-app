"use server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
const { JWT_SECRET } = process.env;

export async function getContacts() {
  const token = cookies().get("token")?.value;
  if (!token) {
    console.log("no hay ninguna cookie");
    return;
  }
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(JWT_SECRET)
  );
  if (!payload) {
    console.log("fallo al obtener info de usuario");
    return;
  }

  const userId = payload?.id;

  try {
    const prisma = new PrismaClient();

    const contacts = await prisma.contact.findMany({
      where: {
        userId: Number(userId),
      },
    });

    return contacts;
  } catch (error) {
    console.log("Error en prisma findMany");
  }
}
