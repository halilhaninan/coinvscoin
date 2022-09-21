import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import getReducer from "../features/data/dataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getVote: getReducer,
  },
});
