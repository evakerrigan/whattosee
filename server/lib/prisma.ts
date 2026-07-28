import { PrismaClient } from '@prisma/client';

// Единый экземпляр PrismaClient. В serverless-среде (Vercel) модуль может
// переиспользоваться между вызовами — держим клиент в globalThis, чтобы не
// плодить пулы соединений.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
