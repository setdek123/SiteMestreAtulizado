import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as any;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["error"] });

// Usa NODE_ENV para controlar cache global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}