import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  languages: [],
  error: null,
};
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    getLanguages: (state) => {
      state.loading = true;
    },
    getLanguagesSuccess: (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.languages = action.payload;
      state.error = null;
    },
    getLanguagesFail: (state, action) => {
      state.loading = false;
      state.loaded = false;
      state.error = action.payload;
    },
  },
});
const languageReducer = languageSlice.reducer;
export default languageReducer;
export const languageAction = languageSlice.actions;
