import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@/components/theme-provider"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import AdminDashboard from './pages/Admin/AdminDashboard.tsx'
import VendorDashboard from './pages/Vendor/VendorDashboard.tsx'
import CustomerDashboard from './pages/Customer/CustomerDashboard.tsx'
import NotFound from './NotFound.tsx'
import ManageVendors from './pages/Admin/ManageVendors.tsx'
import CheckProducts from './pages/Admin/CheckProducts.tsx'
import AdminFeedbacks from './pages/Admin/AdminFeedbacks.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/adash", element: <AdminDashboard /> },
  { path: "/vdash", element: <VendorDashboard /> },
  { path: "/cdash", element: <CustomerDashboard /> },
  { path: "/avendor", element: <ManageVendors /> },
  { path: "/aproduct", element: <CheckProducts /> },
  { path: "/afeedback", element: <AdminFeedbacks /> },
  { path: "*", element: <NotFound /> }
])

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
  </ThemeProvider>
)
