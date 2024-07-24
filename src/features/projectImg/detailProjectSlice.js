import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  currentProject: null,
  error: null,
};
const projectDetailImgSlice = createSlice({
  name: "projectDetailImg",
  initialState,
  reducers: {
    getCurrentProject: (state) => {
      state.loading = true;
    },
    getCurrentProjectSuccess: (state, action) => {
      state.loading = false;
      state.currentProject = action.payload;
      state.error = null;
    },
    getCurrentProjectFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const projectDetailImgReducer = projectDetailImgSlice.reducer;
export default projectDetailImgReducer;
export const projectDetailImgAction = projectDetailImgSlice.actions;
