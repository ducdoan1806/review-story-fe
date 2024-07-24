import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/pictureProjectItem.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/utils";

const PictureProjectItem = ({ idx, title, description, created_at }) => {
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{title || "--"}</td>
      <td>{description || "--"}</td>
      <td>{formatDate(new Date(created_at)) || "--"}</td>
      <td>
        <div className="flex gap-2 justify-end">
          <Link to={"/picture-project/1"} className="editTableBtn">
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <button className="deleteTableBtn">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
};
PictureProjectItem.propTypes = {
  idx: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string,
};
export default PictureProjectItem;
