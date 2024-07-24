import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaded: false,
  loading: false,
  result: null,
  error: null,
};
const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    getTranslation: (state) => {
      state.loading = true;
    },
    getTranslationSuccess: (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.result = action.payload;
      state.error = null;
    },
    getTranslationFail: (state, action) => {
      state.loading = false;
      state.loaded = false;
      state.error = action.payload;
    },
  },
});
const translationReducer = translationSlice.reducer;
export default translationReducer;
export const translationAction = translationSlice.actions;
