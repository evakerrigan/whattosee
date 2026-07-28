import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import moviesRouter from './routes/movies';
import genresRouter from './routes/genres';
import countriesRouter from './routes/countries';
import healingsRouter from './routes/healings';

// Express-приложение. Экспортируется без вызова listen(), чтобы его можно было
// переиспользовать: локально — через server/index.ts, на Vercel — через api/index.ts.
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/movies', moviesRouter);
app.use('/api/genres', genresRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/healings', healingsRouter);

// 404 для неизвестных путей под /api.
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Централизованная обработка ошибок: ZodError → 400, остальное → 500.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res
      .status(400)
      .json({ error: 'Некорректные параметры запроса', issues: err.issues });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
};
app.use(errorHandler);

export default app;
