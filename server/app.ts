import express from 'express';
import cors from 'cors';

// Express-приложение. Экспортируется без вызова listen(), чтобы его можно было
// переиспользовать: локально — через server/index.ts, на Vercel — через api/index.ts.
const app = express();

app.use(cors());
app.use(express.json());

// Проверка живости. Роуты домена (фильмы, жанры, страны, лечение) добавляются в фазе 3.
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
