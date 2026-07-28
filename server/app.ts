import express, { type ErrorRequestHandler } from 'express';
import cors from 'cors';
import { ZodError } from 'zod';
import moviesRouter from './routes/movies.js';
import genresRouter from './routes/genres.js';
import countriesRouter from './routes/countries.js';
import healingsRouter from './routes/healings.js';

// Собираем Express-приложение (без запуска сервера), чтобы один и тот же app
// использовался и локально (server/index.ts), и на Vercel (api/index.ts).
export const app = express();

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
