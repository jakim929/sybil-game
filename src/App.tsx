import './index.css'

import { Providers } from '@/components/Providers'
import { AppRoutes } from '@/AppRoutes'

function App() {
  return (
    <Providers>
      <AppRoutes />
    </Providers>
  )
}

export default App
