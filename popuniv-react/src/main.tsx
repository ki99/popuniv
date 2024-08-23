import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import { AppProvider } from '@/app/providers'
import Login from '@/app/routes/(auth)/login/page'
import Register from '@/app/routes/(auth)/register/page'
import Home from '@/app/routes/home/page'
import NotFound from '@/app/routes/not-found'
import ErrorElement from '@/components/routers/error-element'
import { ProtectedRoute } from '@/components/routers/protected-route'
import { Toaster } from '@/components/ui/toaster'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorElement />,
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute>
        <Register />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute>
        <Login />
      </ProtectedRoute>
    ),
    errorElement: <ErrorElement />,
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
