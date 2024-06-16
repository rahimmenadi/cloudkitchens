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
export const productServiceApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 120,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ filter, name }) => ({
        url: `/product-service/api/product/searchByIdChefAndName?idChef=${filter}&name=${name}`,
      }),
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/product-service/api/product/${id}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: "/product-service/api/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    // updateProduct: builder.mutation({
    //   query: ({ id, product }) => ({
    //     url: `/product-service/api/product/${id}`,
    //     method: "PATCH",
    //     body: product,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Product", id }],
    // }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product-service/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    // validateProduct: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/product-service/api/product/${id}/validate`,
    //     method: "PUT",
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Product", id }],
    // }),
    // validateProduct: builder.mutation({
    //   query: ({ validationObj }) => ({
    //     url: `/product-service/api/product/availability`,
    //     method: "PUT",
    //     body: validationObj,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Product", id }],
    // }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  // useUpdateProductMutation,
  useDeleteProductMutation,
} = productServiceApi;
