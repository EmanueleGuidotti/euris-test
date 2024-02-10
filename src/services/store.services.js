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
      providesTags: ["Store"],
    }),
    getStoresById: builder.query({
      query: ({ id }) => ({
        url: `/stores/${id}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    getProductsByStoreId: builder.query({
      query: ({ id }) => ({
        url: `/stores/${id}/products`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    addProductToStore: builder.mutation({
      query({ storeId, ...body }) {
        return {
          url: `/stores/${storeId}/products`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Store"],
    }),
    getProductByProductId: builder.query({
      query: ({ storeId, productId }) => ({
        url: `/stores/${storeId}/products/${productId}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
    deleteProductFromStore: builder.mutation({
      query({ storeId, productId }) {
        return {
          url: `/stores/${storeId}/products/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Store"],
    }),
    getStatsByStoreId: builder.query({
      query: ({ storeId }) => ({
        url: `/stores/${storeId}/stats/categories`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useGetStoresByIdQuery,
  useGetProductsByStoreIdQuery,
  useAddProductToStoreMutation,
  useGetProductByProductIdQuery,
  useDeleteProductFromStoreMutation,
  useGetStatsByStoreIdQuery,
} = storeApi;
