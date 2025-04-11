import { configureStore } from "@reduxjs/toolkit";
import { categoriesApiSlice } from "./slices/categories-api-slice";
import { authApiSlice } from "./slices/auth-api-slice";
import { userApiSlice } from "./slices/user-api-slice";

export const store = configureStore({
    reducer: {
        [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(categoriesApiSlice.middleware)
            .concat(authApiSlice.middleware)
            .concat(userApiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
