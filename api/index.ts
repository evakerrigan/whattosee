import 'dotenv/config';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Точка входа serverless-функции Vercel. Приложение импортируем динамически
// внутри try/catch, чтобы любая ошибка на этапе загрузки (например,
// инициализация Prisma) вернулась читаемым JSON, а не рушила функцию
// непрозрачным FUNCTION_INVOCATION_FAILED. Импорт с .js — требование Node-ESM.
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    const { app } = await import('../server/app.js');
    return (app as unknown as (r: IncomingMessage, s: ServerResponse) => void)(
      req,
      res
    );
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        bootError: String(err),
        stack: err instanceof Error ? err.stack : undefined,
      })
    );
  }
}
