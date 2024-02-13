import { INVOICE_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createInvoice: builder.mutation({
      query: invoiceData => ({
        url: INVOICE_URL,
        method: 'POST',
        body: invoiceData
      })
    }),
    getInvoices: builder.query({
      query: () => ({
        url: INVOICE_URL
      })
    }),
    getInvoice: builder.query({
      query: invoiceId => ({
        url: `${INVOICE_URL}/${invoiceId}`
      })
    }),
    sendInvoice: builder.mutation({
      query: invoiceId => ({
        url: `${INVOICE_URL}/send-invoice/${invoiceId}`,
        method: 'POST'
      })
    })
  })
});

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useSendInvoiceMutation
} = invoiceApiSlice;
