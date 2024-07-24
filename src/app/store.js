import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import projectImgReducer from "../features/projectImg/projectImgSlice";
import projectDetailImgReducer from "../features/projectImg/detailProjectSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  projectImg: projectImgReducer,
  projectDetailImg: projectDetailImgReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
