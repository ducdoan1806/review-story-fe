import http from "../../app/http";
import { getCookie } from "../../utils/utils";
import { authAction } from "./authSlice";
import { userAction } from "./userSlice";

export const loginApi = (info) => async (dispatch) => {
  dispatch(authAction.login());
  try {
    const res = await http.post("login", JSON.stringify(info));
    dispatch(authAction.loginSuccess(res.data));
  } catch (e) {
    dispatch(authAction.loginFail(e?.response?.data?.error));
  }
};
export const getUserApi = () => async (dispatch) => {
  dispatch(userAction.getUser());
  try {
    const res = await http.get("user", {
      headers: { Authorization: getCookie("authToken") },
    });

    dispatch(userAction.getUserSuccess(res.data));
  } catch (e) {
    dispatch(userAction.getUserFail(e?.response?.data?.error));
  }
};
