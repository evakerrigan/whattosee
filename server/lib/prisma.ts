import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client.js';

// Singleton клиента Prisma. Один и тот же код работает локально и в serverless
// на Vercel: Neon-адаптер ходит в БД через пулинг. В dev держим экземпляр на
// globalThis, чтобы hot-reload не плодил подключения.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const createPrismaClient = (): PrismaClient => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL не задан (см. .env)');
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
};

const getPrisma = (): PrismaClient => {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
};

// Ленивая инициализация: клиент создаётся при первом обращении, а не при
// импорте модуля. На Vercel это важно — ошибка подключения тогда ловится
// в try/catch обработчика (api/index.ts) и возвращается читаемым JSON, а не
// рушит холодный старт функции непрозрачным FUNCTION_INVOCATION_FAILED.
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
