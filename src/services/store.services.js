import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../settings/axiosInstance";

export const storeApi = createApi({
  reducerPath: "store",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Store"],
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => ({
        url: `/stores`,
        method: "GET",
      }),
    }),
    getStoresById: builder.query({
      query: ({ id }) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
    }),
    getProductsByStoreId: builder.query({
      query: ({ id }) => ({
        url: `/stores/${id}/products`,
        method: "GET",
      }),
    }),
    addProductToStore: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `/stores/${id}/products`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoresByIdQuery,
  useGetProductsByStoreIdQuery,
  useAddProductToStoreMutation,
} = storeApi;
