export const BASE_URL =
  import.meta.env.VITE_NODE_ENV !== 'production'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_BACKEND_SERVER;
export const CLIENT_URL = '/api/v1/clients';
export const UPLOAD_URL = '/api/v1/uploads';
export const USERS_URL = '/api/v1/users';
export const INVOICE_URL = '/api/v1/invoices';
