import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/components/auth/store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
