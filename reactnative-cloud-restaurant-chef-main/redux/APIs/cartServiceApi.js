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

export const ewwwwwjcartServiceApi = createApi({
  reducerPath: "cartServiceApi",
  baseQuery: baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addProductToCart: builder.mutation({
      query: ({ cartId, product }) => ({
        url: `/order-service/api/carts/${cartId}/products`,
        method: "POST",
        body: product,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
    getCartById: builder.query({
      query: (id) => ({
        url: `/order-service/api/carts/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result, error, id) => [{ type: "Cart", id }],
    }),
    updateProductInCart: builder.mutation({
      query: ({ cartId, productId, product }) => ({
        url: `/order-service/api/carts/${cartId}/products/${productId}`,
        method: "PUT",
        body: product,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Cart", id }],
    }),
    deleteProductFromCart: builder.mutation({
      query: ({ cartId, productId }) => ({
        url: `/order-service/api/carts/${cartId}/products/${productId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Cart", id }],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/order-service/api/carts/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Cart", id }],
    }),
    checkout: builder.mutation({
      query: (cartId) => ({
        url: `/order-service/api/carts/${cartId}/checkout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),
  }),
});

export const {
  useAddProductToCartMutation,
  useGetCartByIdQuery,
  useUpdateProductInCartMutation,
  useDeleteProductFromCartMutation,
  useDeleteCartMutation,
  useCheckoutMutation,
} = cartServiceApi;
