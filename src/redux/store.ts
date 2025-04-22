import { configureStore } from "@reduxjs/toolkit";
import { categoriesApiSlice } from "./slices/categories-api-slice";
import { authApiSlice } from "./slices/auth-api-slice";
import { userApiSlice } from "./slices/user-api-slice";
import { taskApiSlice } from "./slices/tasks-api-slice";
import { bidsApiSlice } from "./slices/bids-api-slice";
import { reviewApiSlice } from "./slices/review-api-slice";
import { notificationApiSlice } from "./slices/notification-api-slice";
import { messagesApiSlice } from "./slices/messages-api-slice";

export const store = configureStore({
    reducer: {
        [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [taskApiSlice.reducerPath]: taskApiSlice.reducer,
        [bidsApiSlice.reducerPath]: bidsApiSlice.reducer,
        [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
        [notificationApiSlice.reducerPath]: notificationApiSlice.reducer,
        [messagesApiSlice.reducerPath]: messagesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(categoriesApiSlice.middleware)
            .concat(authApiSlice.middleware)
            .concat(userApiSlice.middleware)
            .concat(taskApiSlice.middleware)
            .concat(bidsApiSlice.middleware)
            .concat(reviewApiSlice.middleware)
            .concat(notificationApiSlice.middleware)
            .concat(messagesApiSlice.middleware);
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
