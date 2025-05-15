import { PrismaClient } from "../prisma/generated/prisma";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = !!process.env.DATABASE_URL
  ? globalForPrisma.prisma || new PrismaClient()
  : null;

if (process.env.NODE_ENV !== "production" && prisma)
  globalForPrisma.prisma = prisma;

export const db = prisma;
