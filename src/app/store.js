import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import projectImgReducer from "../features/projectImg/projectImgSlice";
import projectDetailImgReducer from "../features/projectImg/detailProjectSlice";
import languageReducer from "../features/translation/languageSlice";
import translationReducer from "../features/translation/translateSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  projectImg: projectImgReducer,
  projectDetailImg: projectDetailImgReducer,
  language: languageReducer,
  translation: translationReducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
