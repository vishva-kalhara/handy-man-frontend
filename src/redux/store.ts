import { configureStore } from "@reduxjs/toolkit";
import { categoriesApiSlice } from "./slices/categories-api-slice";

export const store = configureStore({
    reducer: {
        [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(categoriesApiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
