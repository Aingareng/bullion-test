import userReducer from "@/features/dashboard/stores/userStore";
import { configureStore } from "@reduxjs/toolkit";
import dialogReducer from "@/features/dashboard/stores/dialogStore";

export const store = configureStore({
  reducer: {
    users: userReducer,
    dialog: dialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
