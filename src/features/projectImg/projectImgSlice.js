import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  projectList: [],
  error: null,
  page: 1,
  pageSize: 20,
  search: "",
  count: 0,
};
const projectImgSlice = createSlice({
  name: "projectImg",
  initialState,
  reducers: {
    updatePagination(state, action) {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
    },
    setSearchQuery(state, action) {
      state.search = action.payload.search;
      state.page = 1; // Reset page on search
    },
    getProjectImg: (state) => {
      state.loading = true;
    },
    getProjectImgSuccess: (state, action) => {
      state.loaded = true;
      state.loading = false;
      state.count = action.payload.count;
      if (state.page === 1) state.projectList = action.payload.items;
      else state.projectList = [...state.projectList, ...action.payload.items];
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
      state.count += 1;
      state.error = null;
    },
    createProjectImgFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectImg: (state) => {
      state.loading = true;
    },
    deleteProjectImgSuccess: (state, action) => {
      state.loading = false;
      state.projectList = state.projectList.filter(
        (item) => item.id !== action.payload
      );
      state.error = null;
    },
    deleteProjectImgFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const projectImgReducer = projectImgSlice.reducer;
export default projectImgReducer;
export const projectImgAction = projectImgSlice.actions;
