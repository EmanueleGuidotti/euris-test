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
      query: ({ queryParam }) => ({
        url: `/stores/${queryParam}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStoresQuery, useGetStoresByIdQuery } = storeApi;
