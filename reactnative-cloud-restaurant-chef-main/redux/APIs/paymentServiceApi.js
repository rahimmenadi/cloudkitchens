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
export const paymentServiceApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQuery,
  keepUnusedDataFor: 120,
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    // Endpoint to get all payments
    getAllPayments: builder.query({
      query: (filter) => ({
        url: `/payment-service/api/payments${filter}`,
      }),
      providesTags: ["Payment"],
    }),
    // Endpoint to get a payment by ID
    getPaymentById: builder.query({
      query: (id) => `/payment-service/api/payment/${id}`,
      providesTags: (result, error, id) => [{ type: "Payment", id }],
    }),
    getOrdersByChef: builder.query({
      query: () => `/payment-service/api/orders/chef`,
      providesTags: ["Payment"],
    }),
    getOrdersById: builder.query({
      query: (id) => `/payment-service/api/orders/${id}`,
      providesTags: ["Payment"],
    }),
    // Endpoint to create a new payment
    createPayment: builder.mutation({
      query: (payment) => ({
        url: "/payment-service/api/payment",
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Payment"],
    }),
    // Endpoint to update a payment
    updatePayment: builder.mutation({
      query: ({ id, payment }) => ({
        url: `/payment-service/api/payment/${id}`,
        method: "PATCH",
        body: payment,
      }),
      invalidatesTags: ["Payment"],
    }),
    // Endpoint to delete a payment
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payment-service/api/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
    // Endpoint to validate a payment
    validatePayment: builder.mutation({
      query: (id) => ({
        url: `/payment-service/api/payment/${id}/validate`,
        method: "PUT",
      }),
      invalidatesTags: ["Payment"],
    }),
    validateOrderByChef: builder.mutation({
      query: (id) => ({
        url: `/payment-service/api/orders/${id}/validate`,
        method: "PUT",
      }),
      invalidatesTags: ["Payment"],
    }),
    rejectOrderByChef: builder.mutation({
      query: (id) => ({
        url: `/payment-service/api/orders/${id}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["Payment"],
    }),
    updateOrderState: builder.mutation({
      query: ({ id, state }) => ({
        url: `/payment-service/api/orders/${id}/${state}`,
        method: "PUT",
      }),
      invalidatesTags: ["Payment"],
    }),
    setAgenceForOrder: builder.mutation({
      query: ({ id, agence }) => ({
        url: `/payment-service/api/orders/${id}/agence?agenceId=${agence}`,
        method: "PUT",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useGetOrdersByChefQuery,
  useGetOrdersByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useValidatePaymentMutation,
  useValidateOrderByChefMutation,
  useRejectOrderByChefMutation,
  useUpdateOrderStateMutation,
  useSetAgenceForOrderMutation,
} = paymentServiceApi;
