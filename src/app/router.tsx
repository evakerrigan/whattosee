import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layouts/app-layout';
import { HomeRoute } from './routes/home';
import { MoviesRoute } from './routes/movies';
import { MovieRoute } from './routes/movie';
import { HealingRoute } from './routes/healing';
import { HealingDetailRoute } from './routes/healing-detail';
import { NotFoundRoute } from './routes/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomeRoute /> },
      { path: 'movies', element: <MoviesRoute /> },
      { path: 'movies/:id', element: <MovieRoute /> },
      { path: 'healing', element: <HealingRoute /> },
      { path: 'healing/:slug', element: <HealingDetailRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
]);
