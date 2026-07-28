import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layouts/app-layout';
import { MoviesRoute } from './routes/movies';
import { MovieRoute } from './routes/movie';
import { NotFoundRoute } from './routes/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Временно главная = каталог; отдельная главная появится в фазе 7.
      { index: true, element: <MoviesRoute /> },
      { path: 'movies', element: <MoviesRoute /> },
      { path: 'movies/:id', element: <MovieRoute /> },
      { path: '*', element: <NotFoundRoute /> },
    ],
  },
]);
