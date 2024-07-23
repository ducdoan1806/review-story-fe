import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
