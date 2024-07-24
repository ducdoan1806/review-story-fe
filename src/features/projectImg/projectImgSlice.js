import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  projectList: [],
  error: null,
};
const projectImgSlice = createSlice({
  name: "projectImg",
  initialState,
  reducers: {
    getProjectImg: (state) => {
      state.loading = true;
    },
    getProjectImgSuccess: (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.projectList = action.payload?.items;
      state.projectList.reverse();
      state.error = null;
    },
    getProjectImgFail: (state, action) => {
      state.loaded = false;
      state.loading = false;
      state.error = action.payload;
    },
    createProjectImg: (state) => {
      state.loading = true;
    },
    createProjectImgSuccess: (state, action) => {
      state.loading = false;
      state.projectList.unshift(action.payload);
      state.error = null;
    },
    createProjectImgFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const projectImgReducer = projectImgSlice.reducer;
export default projectImgReducer;
export const projectImgAction = projectImgSlice.actions;
