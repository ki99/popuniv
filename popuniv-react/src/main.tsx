import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import { AppProvider } from '@/app/providers'
import Login from '@/app/routes/(auth)/login/page'
import Register from '@/app/routes/(auth)/register/page'
import Home from '@/app/routes/home/page'
import NotFound from '@/app/routes/not-found'
import { Toaster } from '@/components/ui/toaster'
import { ProtectedRoute } from '@/lib/router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AppProvider>
  </StrictMode>,
)
