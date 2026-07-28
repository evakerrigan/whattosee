import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/app/layouts';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
