import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ClientPage from '../pages/ClientPage';
import InvoicePage from '../pages/InvoicePage';
import ClientFormPage from '../pages/ClientFormPage';
import InvoiceFormPage from '../pages/InvoiceFormPage';
import InvoiceDetail from '../pages/InvoiceDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/clients',
        element: <ClientPage />
      },
      {
        path: '/invoices',
        element: <InvoicePage />
      },
      {
        path: '/add-client',
        element: <ClientFormPage />
      },
      {
        path: '/add-invoice',
        element: <InvoiceFormPage />
      },
      {
        path: '/invoices/:id',
        element: <InvoiceDetail />
      }
    ]
  }
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
