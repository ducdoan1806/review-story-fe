import http from "../../app/http";
import { getCookie } from "../../utils/utils";
import { languageAction } from "./languageSlice";
import { translationAction } from "./translateSlice";

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
export const translateApi = (info) => async (dispatch) => {
  dispatch(translationAction.getTranslation());
  try {
    const res = await http.post("translate", JSON.stringify(info), {
      headers: { Authorization: getCookie("authToken") },
    });

    dispatch(translationAction.getTranslationSuccess(res?.data));
  } catch (e) {
    dispatch(languageAction.getLanguagesFail(e?.response?.data));
  }
};
