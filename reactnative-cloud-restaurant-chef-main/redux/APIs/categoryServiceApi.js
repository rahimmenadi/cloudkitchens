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

export const categoryServiceApi = createApi({
  reducerPath: "categoryServiceApi",
  baseQuery: baseQuery,
  // keepUnusedDataFor: 120,

  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // addCategory: builder.mutation({
    //   query: (category) => ({
    //     url: "/category-service/api/category",
    //     method: "POST",
    //     body: category,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //     },
    //   }),
    //   invalidatesTags: [{ type: "Category", id: "LIST" }],
    // }),
    getCategories: builder.query({
      query: () => "/category-service/api/category",
      providesTags: [{ type: "Category", id: "LIST" }],
    }),
    // getCategoryById: builder.query({
    //   query: (id) => `/category-service/api/category/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Category", id }],
    // }),
    // updateCategory: builder.mutation({
    //   query: ({ id, category }) => ({
    //     url: `/category-service/api/category/${id}`,
    //     method: "PATCH",
    //     body: category,
    //   }),
    //   invalidatesTags: [{ type: "Category", id }],
    // }),
    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `/category-service/api/category/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [{ type: "Category", id }],
    // }),
  }),
});

export const {
  // useAddCategoryMutation,
  useGetCategoriesQuery,
  // useGetCategoryByIdQuery,
  // useUpdateCategoryMutation,
  // useDeleteCategoryMutation,
} = categoryServiceApi;
