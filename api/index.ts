import app from '../server/app';

// Точка входа serverless-функции Vercel. Все запросы к /api/* попадают сюда
// (см. rewrites в vercel.json), а Express внутри разбирает пути самостоятельно.
export default app;
