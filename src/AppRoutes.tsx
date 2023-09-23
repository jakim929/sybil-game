import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom'
import { MainPage } from '@/pages/Main/MainPage'
import { GameAvailableLayout } from '@/components/GameAvailableLayout'

import { AdminPage } from '@/pages/Admin/AdminPage'
import { PlayPage } from '@/pages/Play/PlayPage'
import { Button } from '@/components/ui/button'

const router = createBrowserRouter([
  {
    element: (
      <GameAvailableLayout>
        <Outlet />
      </GameAvailableLayout>
    ),
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
