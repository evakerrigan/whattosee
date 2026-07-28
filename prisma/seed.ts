import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- Справочники ---------------------------------------------------------

const genres = [
  { slug: 'drama', name: 'Драма' },
  { slug: 'melodrama', name: 'Мелодрама' },
  { slug: 'comedy', name: 'Комедия' },
  { slug: 'sci-fi', name: 'Фантастика' },
  { slug: 'thriller', name: 'Триллер' },
  { slug: 'arthouse', name: 'Артхаус' },
  { slug: 'fantasy', name: 'Фэнтези' },
  { slug: 'history', name: 'Историческое' },
  { slug: 'horror', name: 'Ужасы' },
];

const countries = [
  { slug: 'sweden', name: 'Швеция' },
  { slug: 'usa', name: 'США' },
  { slug: 'korea', name: 'Корея' },
  { slug: 'uk', name: 'Великобритания' },
  { slug: 'czech', name: 'Чехия' },
];

const healings = [
  {
    slug: 'mother',
    title: 'Лечит отношения с мамой',
    description: 'Разобраться с материнской фигурой, обидами и близостью.',
  },
  {
    slug: 'family',
    title: 'Лечит семейные отношения',
    description:
      'Про брак, отдаление и то, что происходит за закрытыми дверями.',
  },
  {
    slug: 'betrayal',
    title: 'Помогает пережить измену',
    description: 'Когда предали или предал — честно и без утешительной лжи.',
  },
  {
    slug: 'aftertaste',
    title: 'Для хорошего послевкусия',
    description: 'Просто лечит: тёплое, красивое, с долгим послевкусием.',
  },
];

// --- Фильмы --------------------------------------------------------------
// review — черновые рецензии на основе твоих заметок, замени на свои.
// imdbRating — приблизительные значения, сверь при случае.

type SeedMovie = {
  title: string;
  originalTitle?: string;
  year?: number;
  imdbRating?: number;
  countrySlug?: string;
  genreSlugs: string[];
  healingSlugs?: string[];
  description: string;
  review: string;
};

const movies: SeedMovie[] = [
  {
    title: 'Осенняя соната',
    originalTitle: 'Höstsonaten',
    year: 1978,
    imdbRating: 8.1,
    countrySlug: 'sweden',
    genreSlugs: ['drama'],
    healingSlugs: ['mother'],
    description:
      'Пианистка приезжает к дочери спустя семь лет — и одна ночь вскрывает всё невысказанное между матерью и ребёнком. Бергман и две Ингрид на пике.',
    review:
      'Лечит отношения с мамой. Смотреть, когда нужно назвать вещи своими именами.',
  },
  {
    title: 'Сцены из супружеской жизни',
    originalTitle: 'Scener ur ett äktenskap',
    year: 1974,
    imdbRating: 8.4,
    countrySlug: 'sweden',
    genreSlugs: ['drama'],
    healingSlugs: ['family'],
    description:
      'Анатомия одного брака: от благополучного фасада до развода и того, что остаётся после. Бергман разбирает близость на молекулы.',
    review: 'Лечит семейные отношения — показывает их без анестезии.',
  },
  {
    title: 'Идиократия',
    originalTitle: 'Idiocracy',
    year: 2006,
    imdbRating: 6.6,
    countrySlug: 'usa',
    genreSlugs: ['comedy', 'sci-fi'],
    description:
      'Средний американец засыпает в военном эксперименте и просыпается через 500 лет — в мире, отупевшем до предела. Сатира, которая стареет пугающе хорошо.',
    review: 'Комедия, которая с годами всё меньше похожа на фантастику.',
  },
  {
    title: 'Алхимия душ',
    originalTitle: '환혼 (Alchemy of Souls)',
    year: 2022,
    imdbRating: 8.6,
    countrySlug: 'korea',
    genreSlugs: ['melodrama', 'fantasy'],
    description:
      'Могущественная душа в теле слепой служанки, маг без силы и запретная магия перемещения душ. Сказка о судьбе и любви.',
    review:
      'Лучшая корейская сказка. Мелодрама, в которую проваливаешься с головой.',
  },
  {
    title: 'Олдбой',
    originalTitle: '올드보이 (Oldeuboi)',
    year: 2003,
    imdbRating: 8.3,
    countrySlug: 'korea',
    genreSlugs: ['thriller', 'drama'],
    description:
      'Человека держат в плену 15 лет без объяснений, а потом отпускают и дают 5 дней найти виновного. Пак Чхан-ук о мести, которая пожирает мстящего.',
    review: 'Корея о мести. Не отпускает и бьёт под дых финалом.',
  },
  {
    title: 'Орландо',
    originalTitle: 'Orlando',
    year: 1992,
    imdbRating: 7.2,
    countrySlug: 'uk',
    genreSlugs: ['drama', 'history'],
    healingSlugs: ['aftertaste'],
    description:
      'Молодой дворянин, которому королева велела не стареть, проживает 400 лет — и однажды просыпается женщиной. Свободная экранизация Вулф с Тильдой Суинтон.',
    review: 'Просто лечит. Хорошее послевкусие, к которому возвращаешься.',
  },
  {
    title: 'Близость',
    originalTitle: 'Closer',
    year: 2004,
    imdbRating: 7.2,
    countrySlug: 'usa',
    genreSlugs: ['drama', 'melodrama'],
    healingSlugs: ['betrayal'],
    description:
      'Четверо в Лондоне встречаются, сходятся и предают друг друга по кругу. Разговоры об измене, вывернутые до самой честной и жестокой правды.',
    review: 'Фильм об изменах. Смотреть, когда готова к неудобной честности.',
  },
  {
    title: 'Лобстер',
    originalTitle: 'The Lobster',
    year: 2015,
    imdbRating: 7.1,
    countrySlug: 'uk',
    genreSlugs: ['arthouse', 'sci-fi', 'drama'],
    description:
      'В мире, где одиноким даётся 45 дней найти пару или превратиться в животное, герой выбирает, кем станет. Лантимос, абсурд и холодная нежность.',
    review: 'Фильм не для всех. Артхаус, который либо твой, либо нет.',
  },
  {
    title: 'Полено',
    originalTitle: 'Otesánek',
    year: 2000,
    imdbRating: 7.1,
    countrySlug: 'czech',
    genreSlugs: ['arthouse', 'horror', 'fantasy'],
    description:
      'Бездетная пара «усыновляет» корягу в форме младенца — и она оживает с ненасытным аппетитом. Шванкмайер превращает чешскую сказку в тревожный гротеск.',
    review: 'Фильм не для всех. Артхаус на любителя чешского сюрреализма.',
  },
];

// --- Заливка -------------------------------------------------------------

async function main() {
  for (const g of genres) {
    await prisma.genre.upsert({
      where: { slug: g.slug },
      update: g,
      create: g,
    });
  }
  for (const c of countries) {
    await prisma.country.upsert({
      where: { slug: c.slug },
      update: c,
      create: c,
    });
  }
  for (const h of healings) {
    await prisma.healing.upsert({
      where: { slug: h.slug },
      update: h,
      create: h,
    });
  }

  // Пересоздаём фильмы (у Movie нет natural-ключа) — связи в implicit m2m
  // Prisma очистит автоматически при удалении.
  await prisma.movie.deleteMany();

  for (const m of movies) {
    await prisma.movie.create({
      data: {
        title: m.title,
        originalTitle: m.originalTitle,
        year: m.year,
        imdbRating: m.imdbRating,
        otherRatingSource: 'Кинопоиск',
        description: m.description,
        review: m.review,
        ...(m.countrySlug
          ? { country: { connect: { slug: m.countrySlug } } }
          : {}),
        genres: { connect: m.genreSlugs.map((slug) => ({ slug })) },
        ...(m.healingSlugs?.length
          ? { healings: { connect: m.healingSlugs.map((slug) => ({ slug })) } }
          : {}),
      },
    });
  }

  const counts = {
    movies: await prisma.movie.count(),
    genres: await prisma.genre.count(),
    countries: await prisma.country.count(),
    healings: await prisma.healing.count(),
  };
  console.log('Seed завершён:', counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
