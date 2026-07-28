import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { asyncHandler } from '../lib/async-handler';

const router = Router();

// GET /api/genres — жанры со счётчиком фильмов (для селекта фильтров).
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const genres = await prisma.genre.findMany({
      select: {
        slug: true,
        name: true,
        _count: { select: { movies: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.json(genres);
  })
);

export default router;
