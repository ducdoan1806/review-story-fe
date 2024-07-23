import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  currentUser: null,
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    getUserFail: (state, action) => {
      state.loaded = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
export const userAction = userSlice.actions;
