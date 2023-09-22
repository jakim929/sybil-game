import { NavBar } from '@/components/NavBar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="flex flex-col flex-1">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}
