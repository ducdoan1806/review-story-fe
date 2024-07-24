import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/utils";

const initialState = {
  loaded: false,
  loading: false,
  token: null,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loaded = true;
      state.loading = false;
      setCookie({
        value: action.payload?.full_token,
        expires: action.payload?.expires_in,
      });
      state.error = null;
    },
    loginFail: (state, action) => {
      state.loaded = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const authReducer = authSlice.reducer;
export default authReducer;
export const authAction = authSlice.actions;
