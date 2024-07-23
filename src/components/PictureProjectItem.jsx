import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/pictureProjectItem.css";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const PictureProjectItem = () => {
  return (
    <tr>
      <td>STT</td>
      <td>Tên dự án</td>
      <td>Mô tả</td>
      <td>
        <div className="flex gap-2 justify-end">
          <button className="editTableBtn">
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="deleteTableBtn">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PictureProjectItem;
