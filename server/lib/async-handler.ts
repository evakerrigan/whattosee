import type { RequestHandler } from 'express';

// Оборачивает async-обработчик, пробрасывая ошибки в next() (Express 4 сам их не ловит).
export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
