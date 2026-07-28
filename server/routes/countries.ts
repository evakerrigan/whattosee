import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../lib/async-handler';

const router = Router();

// GET /api/countries — страны со счётчиком фильмов (для селекта фильтров).
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const countries = await prisma.country.findMany({
      select: {
        slug: true,
        name: true,
        _count: { select: { movies: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json(countries);
  })
);

export default router;
