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

export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  tagTypes: ["User", "Restaurant"],
  endpoints: (builder) => ({
    //client
    signUp: builder.mutation({
      query: (user) => ({
        url: "/user-service/api/v1/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/user-service/api/v1/login/client",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => `/user-service/api/v1/user/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    getMe: builder.query({
      query: () => `/user-service/api/v1/profile`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    verifyToken: builder.mutation({
      query: (token) => ({
        url: "/user-service/api/v1/jwt/verify-token",
        method: "POST",
        body: token,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateChefStatus: builder.mutation({
      query: (id, status) => ({
        url: `/user-service/api/v1/admin/update-chef-status/${id}`,
        method: "POST",
        body: status,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `/user-service/api/v1/admin/users?role=agency`,
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    confirmChefPayment: builder.mutation({
      query: (id) => ({
        url: `/user-service/api/v1/admin/update-chef-payment-status/${id}`,
        method: "POST",
        body: {},
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    createAgency: builder.mutation({
      query: (agency) => ({
        url: "/user-service/api/v1/agency",
        method: "POST",
        body: agency,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    signUpChef: builder.mutation({
      query: (chef) => ({
        url: "/user-service/api/v1/signup/chef",
        method: "POST",
        body: chef,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    loginChef: builder.mutation({
      query: (user) => ({
        url: "/user-service/api/v1/login/chef",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    chefPayment: builder.mutation({
      query: (payment) => ({
        url: "/user-service/api/v1/chef/payment",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getRestaurants: builder.query({
      query: () => "/user-service/api/v1/restaurants",
      providesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    getRestaurantofChef: builder.query({
      query: () => "/user-service/api/v1/chef/restaurant",
      providesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
    getRestaurantById: builder.query({
      query: (id) => `/user-service/api/v1/restaurants/${id}`,
      providesTags: (result, error, id) => [{ type: "Restaurant", id }],
    }),
    getRestaurantByIdChef: builder.query({
      query: (id) => `/user-service/api/v1/chef/restaurant/${id}`,
      providesTags: [{ type: "Restaurant", id: "LIST" }],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetUserByIdQuery,
  useGetMeQuery,
  useVerifyTokenMutation,
  useUpdateChefStatusMutation,
  useGetUsersQuery,
  useConfirmChefPaymentMutation,
  useCreateAgencyMutation,
  useSignUpChefMutation,
  useLoginChefMutation,
  useChefPaymentMutation,
  useGetRestaurantsQuery,
  useGetRestaurantofChefQuery,
  useGetRestaurantByIdQuery,
  useGetRestaurantByIdChefQuery,
} = userServiceApi;
