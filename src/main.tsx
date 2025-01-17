import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Menu } from './pages/Menu/Menu'
import { Cart } from './pages/Cart/Cart'
import { Error } from './pages/Error/Error'
import { Layout } from './Layout/Layout'
import { Product } from './pages/Product/Product'
import { productLoader } from './pages/Product/productLoader'
import { AuthLayout } from './Layout/AuthLayout/AuthLayout'
import { Login } from './pages/Login/Login'
import { Register } from './pages/Register/Register'
import { RequireAuth } from './helpers/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <Product />,
        errorElement: <>Error</>,
        loader: productLoader,
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />,
      }
    ]
  },
  {
    path: '*',
    element: <Error />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div>Загрузка...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);