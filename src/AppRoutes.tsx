import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom'
import { MainPage } from '@/pages/Main/MainPage'
import { GameAvailableLayout } from '@/components/GameAvailableLayout'

import { AdminPage } from '@/pages/Admin/AdminPage'
import { PlayPage } from '@/pages/Play/PlayPage'
import { Button } from '@/components/ui/button'

const router = createBrowserRouter([
  {
    element: <GameAvailableLayout />,
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
    path: 'no-active-game',
    element: (
      <div>
        No active game{' '}
        <Button asChild>
          <Link to="/">Refresh</Link>
        </Button>
      </div>
    ),
  },
  {
    path: 'admin',
    element: <AdminPage />,
  },
])

export const AppRoutes = () => {
  return <RouterProvider router={router} />
}
