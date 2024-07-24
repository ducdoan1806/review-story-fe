import http from "../../app/http";
import { getCookie } from "../../utils/utils";
import { projectDetailImgAction } from "./detailProjectSlice";
import { projectImgAction } from "./projectImgSlice";

export const getProjectList =
  ({ page, pageSize, search }) =>
  async (dispatch) => {
    dispatch(projectImgAction.getProjectImg());
    try {
      const res = await http.get(
        `projects?page_size=${pageSize}&page=${page}&title=${search}`,
        {
          headers: { Authorization: getCookie("authToken") },
        }
      );
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
export const detailProjectImgApi = (id) => async (dispatch) => {
  dispatch(projectDetailImgAction.getCurrentProject());
  try {
    const res = await http.get(`projects/${id}`, {
      headers: { Authorization: getCookie("authToken") },
    });
    dispatch(projectDetailImgAction.getCurrentProjectSuccess(res.data));
  } catch (e) {
    dispatch(projectDetailImgAction.getCurrentProjectFail(e?.response?.data));
  }
};
export const deleteProjectImgApi = (id) => async (dispatch) => {
  dispatch(projectImgAction.deleteProjectImg());
  try {
    await http.delete(`projects/${id}`, {
      headers: { Authorization: getCookie("authToken") },
    });
    dispatch(projectImgAction.deleteProjectImgSuccess(id));
  } catch (e) {
    dispatch(projectImgAction.deleteProjectImgFail(e?.response?.data));
  }
};
