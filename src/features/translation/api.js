import http from "../../app/http";
import { getCookie } from "../../utils/utils";
import { languageAction } from "./languageSlice";

export const getLanguage = () => async (dispatch) => {
  dispatch(languageAction.getLanguages());
  try {
    const res = await http.get("language", {
      headers: { Authorization: getCookie("authToken") },
    });

    dispatch(languageAction.getLanguagesSuccess(res?.data));
  } catch (e) {
    dispatch(languageAction.getLanguagesFail(e?.response?.data));
  }
};
