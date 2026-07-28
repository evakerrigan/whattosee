import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { asyncHandler } from '../lib/async-handler.js';

const router = Router();

const listQuerySchema = z.object({
  genre: z.string().min(1).optional(),
  country: z.string().min(1).optional(),
  healing: z.string().min(1).optional(),
});

// Поля для карточки в списке (без тяжёлых description/review).
const cardSelect = {
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
} as const;

// GET /api/movies?genre=&country=&healing=
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const q = listQuerySchema.parse(req.query);

    const movies = await prisma.movie.findMany({
      where: {
        ...(q.genre ? { genres: { some: { slug: q.genre } } } : {}),
        ...(q.country ? { country: { slug: q.country } } : {}),
        ...(q.healing ? { healings: { some: { slug: q.healing } } } : {}),
      },
      select: cardSelect,
      orderBy: { createdAt: 'desc' },
    });

    res.json(movies);
  })
);

// GET /api/movies/:id — детальная карточка
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const movie = await prisma.movie.findUnique({
      where: { id: req.params.id },
      select: {
        ...cardSelect,
        description: true,
        review: true,
        healings: { select: { slug: true, title: true } },
      },
    });

    if (!movie) {
      res.status(404).json({ error: 'Фильм не найден' });
      return;
    }

    res.json(movie);
  })
);

export default router;
