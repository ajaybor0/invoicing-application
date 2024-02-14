import { INVOICE_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const invoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createInvoice: builder.mutation({
      query: invoiceData => ({
        url: INVOICE_URL,
        method: 'POST',
        body: invoiceData
      }),
      invalidatesTags: ['Invoice']
    }),
    getInvoices: builder.query({
      query: () => ({
        url: INVOICE_URL
      }),
      invalidatesTags: ['Invoice']
    }),
    getInvoice: builder.query({
      query: invoiceId => ({
        url: `${INVOICE_URL}/${invoiceId}`
      }),
      invalidatesTags: ['Invoice']
    }),
    sendInvoice: builder.mutation({
      query: invoiceId => ({
        url: `${INVOICE_URL}/send-invoice/${invoiceId}`,
        method: 'POST'
      }),
      invalidatesTags: ['Invoice']
    }),
    updateInvoiceToPaid: builder.mutation({
      query: invoiceId => ({
        url: `${INVOICE_URL}/pay/${invoiceId}`,
        method: 'PUT'
      }),
      invalidatesTags: ['Invoice']
    })
  })
});

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
  useGetInvoiceQuery,
  useSendInvoiceMutation,
  useUpdateInvoiceToPaidMutation
} = invoiceApiSlice;
