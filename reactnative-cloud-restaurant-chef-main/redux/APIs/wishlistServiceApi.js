import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseurl } from "../baseurl";

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

export const wishlistServiceApi = createApi({
  reducerPath: "wishlistServiceApi",
  baseQuery: baseQuery,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getUserWishlist: builder.query({
      query: () => ({
        url: "/wishlist-service/api/wishlist/items",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    addProductToWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist-service/api/wishlist/items?productId=${productId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    removeProductFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/wishlist-service/api/wishlist/items/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserWishlistQuery,
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
} = wishlistServiceApi;
