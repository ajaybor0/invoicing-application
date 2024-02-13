import { CLIENT_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createClient: builder.mutation({
      query: clientData => ({
        url: CLIENT_URL,
        method: 'POST',
        body: clientData
      })
    }),
    uploadClientImage: builder.mutation({
      query: data => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data
      })
    }),
    getClients: builder.query({
      query: () => ({
        url: CLIENT_URL
      })
    })
  })
});

export const {
  useCreateClientMutation,
  useUploadClientImageMutation,
  useGetClientsQuery
} = clientApiSlice;
