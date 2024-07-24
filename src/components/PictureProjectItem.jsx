import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/pictureProjectItem.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PictureProjectItem = () => {
  return (
    <tr>
      <td>STT</td>
      <td>Tên dự án</td>
      <td>Mô tả</td>
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

export default PictureProjectItem;
