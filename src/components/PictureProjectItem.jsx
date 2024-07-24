import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/pictureProjectItem.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProjectImgApi } from "../features/projectImg/api";

const PictureProjectItem = ({ idx, id, title, description, created_at }) => {
  const [del, setDel] = useState(false);
  const dispatch = useDispatch();
  const hanldeClickDel = () => {
    dispatch(deleteProjectImgApi(id));
  };
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{title || "--"}</td>
      <td>{description || "--"}</td>
      <td>{formatDate(new Date(created_at)) || "--"}</td>
      <td>
        <div className="flex gap-2 justify-end">
          <Link to={`/picture-project/${id}`} className="editTableBtn">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <button
            className="deleteTableBtn"
            onClick={() => {
              setDel(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
        {del && (
          <Modal
            title="Thông báo"
            handleOpen={() => {
              setDel(!del);
            }}
          >
            <div className="text-center">
              <p className="text-center text-base mb-5">
                Bạn có muốn dự án <b className="text-red-400">{title || ""}</b>{" "}
                không ?
              </p>
              <button
                className="px-3 py-2 text-white bg-red-500 rounded"
                onClick={hanldeClickDel}
              >
                Xóa dự án
              </button>
            </div>
          </Modal>
        )}
      </td>
    </tr>
  );
};
PictureProjectItem.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
};
export default PictureProjectItem;
