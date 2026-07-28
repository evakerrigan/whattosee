import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../lib/async-handler.js';

const router = Router();

// GET /api/healings — список «лечебных» категорий.
router.get(
  '/',
  asyncHandler(async (_req, res) => {
    const healings = await prisma.healing.findMany({
      select: {
        slug: true,
        title: true,
        description: true,
        _count: { select: { movies: true } },
      },
      orderBy: { title: 'asc' },
    });
    res.json(healings);
  })
);

// GET /api/healings/:slug — категория + её фильмы (карточки).
router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const healing = await prisma.healing.findUnique({
      where: { slug: req.params.slug },
      select: {
        slug: true,
        title: true,
        description: true,
        movies: {
          select: {
            id: true,
            title: true,
            originalTitle: true,
            year: true,
            posterUrl: true,
            imdbRating: true,
            otherRating: true,
            otherRatingSource: true,
            country: { select: { slug: true, name: true } },
            genres: { select: { slug: true, name: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!healing) {
      res.status(404).json({ error: 'Категория не найдена' });
      return;
    }

    res.json(healing);
  })
);

export default router;
