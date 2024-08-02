import axios from "axios";
import { getCookie } from "../../utils/utils";
import { API_URL } from "../../app/http";

export const createVideoApi = async (info) => {
  try {
    const formData = new FormData();
    console.log("info: ", info);

    if (info.images.length > 0 && info.texts.length > 0) {
      for (let file of info.images) {
        formData.append("images", file);
      }
      for (let text of info.texts) {
        formData.append("texts", text);
      }
    }
    formData.append("voice_type", info.voice_type);

    const res = axios.post(`${API_URL}create_video`, formData, {
      responseType: "blob",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: getCookie("authToken"),
      },
    });
    return res;
  } catch (error) {
    return error?.response?.data;
  }
};
