import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from './features/auth/authSlice'

export const store = configureStore({
    reducer: { 
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    devTools: true,
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(apiSlice.middleware)
});

store.dispatch(apiSlice.endpoints.getUserData.initiate());