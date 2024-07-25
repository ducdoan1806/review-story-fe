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
    createContentImg: (state) => {
      state.loading = true;
    },
    createContentImgSuccess: (state, action) => {
      state.loading = false;
      action.payload?.contents.forEach((item) => {
        state.currentProject.contents.push(item);
      });

      state.error = null;
    },
    createContentImgFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const projectDetailImgReducer = projectDetailImgSlice.reducer;
export default projectDetailImgReducer;
export const projectDetailImgAction = projectDetailImgSlice.actions;
