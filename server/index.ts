import 'dotenv/config';
import { app } from './app.js';

// Локальный запуск dev-сервера API (на Vercel используется api/index.ts).
const port = Number(process.env.PORT ?? 3000);

app.listen(port, '127.0.0.1', () => {
  console.log(`API dev-сервер: http://127.0.0.1:${port}/api/health`);
});
