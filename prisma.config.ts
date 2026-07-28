import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Конфигурация Prisma 7. Подключение к БД задаётся здесь, а не в schema.prisma.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Прямое (непулинговое) подключение Neon — для миграций CLI.
    // Рантайм-клиент приложения ходит через пулинг + Neon-адаптер (см. server/lib/prisma.ts).
    url: process.env['DIRECT_URL'],
  },
});
