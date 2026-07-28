import app from './app';

// Локальный запуск dev-сервера API (не используется на Vercel).
const port = Number(process.env.PORT ?? 3000);

app.listen(port, '127.0.0.1', () => {
  console.log(`API dev-сервер: http://127.0.0.1:${port}/api/health`);
});
