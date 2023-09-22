import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from '@/pages/Main/MainPage'
import { Layout } from '@/components/Layout'

import { AdminPage } from '@/pages/Admin/AdminPage'
import { PlayPage } from '@/pages/Play/PlayPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MainPage />,
      },
      {
        path: 'play',
        element: <PlayPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminPage />,
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}
