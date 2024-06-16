import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userServiceApi } from "./APIs/userServiceApi";
// import { cartServiceApi } from "./APIs/cartServiceApi";
// import { wishlistServiceApi } from "./APIs/wishlistServiceApi";
// import { orderServiceApi } from "./APIs/orderServiceApi.js";
import { productServiceApi } from "./APIs/productServiceApi";
import { categoryServiceApi } from "./APIs/categoryServiceApi";
import { paymentServiceApi } from "./APIs/paymentServiceApi";
export const store = configureStore({
  reducer: {
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [productServiceApi.reducerPath]: productServiceApi.reducer,
    [paymentServiceApi.reducerPath]: paymentServiceApi.reducer,

    // [cartServiceApi.reducerPath]: cartServiceApi.reducer,
    [categoryServiceApi.reducerPath]: categoryServiceApi.reducer,
    // [wishlistServiceApi.reducerPath]: wishlistServiceApi.reducer,
    // [orderServiceApi.reducerPath]: orderServiceApi.reducer,
  },
  // Cache, Polling , invalidate cache
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userServiceApi.middleware,
      productServiceApi.middleware,
      paymentServiceApi.middleware,
      // cartServiceApi.middleware,
      categoryServiceApi.middleware
      // wishlistServiceApi.middleware,
      // orderServiceApi.middleware
    ),
});
setupListeners(store.dispatch);
//refetchOnReconnect, refetchOnFocus
// YAGNI (
//setupListeners(store.dispatch)
