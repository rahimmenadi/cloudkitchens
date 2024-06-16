import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";

const baseQuery = fetchBaseQuery({
  baseUrl: baseurl,
  prepareHeaders: async (headers, { getState }) => {
    // retrieve the access_token from the Expo SecureStore
    const access_token = await SecureStore.getItemAsync("token");
    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }
    return headers;
  },
});

export const orderServiceApi = createApi({
  reducerPath: "orderServiceApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (id) => `order/${id}`,
    }),
  }),
});

export const { useGetOrderByIdQuery } = orderServiceApi;
