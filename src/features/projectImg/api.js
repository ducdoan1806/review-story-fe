import http from "../../app/http";
import { getCookie } from "../../utils/utils";
import { projectImgAction } from "./projectImgSlice";

export const getProjectList = () => async (dispatch) => {
  dispatch(projectImgAction.getProjectImg());
  try {
    const res = await http.get("projects", {
      headers: { Authorization: getCookie("authToken") },
    });
    dispatch(projectImgAction.getProjectImgSuccess(res.data));
  } catch (e) {
    dispatch(projectImgAction.getProjectImgFail(e?.response?.data));
  }
};

export const createProjectApi = (project) => async (dispatch) => {
  dispatch(projectImgAction.createProjectImg());
  try {
    const res = await http.post("projects", JSON.stringify(project), {
      headers: { Authorization: getCookie("authToken") },
    });
    dispatch(projectImgAction.createProjectImgSuccess(res.data));
  } catch (e) {
    dispatch(projectImgAction.createProjectImgFail(e?.response?.data));
  }
};
