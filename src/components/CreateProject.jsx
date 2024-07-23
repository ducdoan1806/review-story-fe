import "../assets/css/createProject.css";
import Modal from "./Modal";
import PropTypes from "prop-types";
const CreateProject = ({ handleOpen }) => {
  return (
    <Modal title={"Thêm mới dự án"} handleOpen={handleOpen}>
      <div className="createProject__inputGroup">
        <label htmlFor="projectName">Tên dự án</label>
        <input
          type="text"
          id="projectName"
          placeholder="Nhập tên dự án"
          autoComplete={false}
        />
      </div>
      <div className="createProject__inputGroup">
        <label htmlFor="projectDesc">Mô tả</label>
        <input
          type="text"
          id="projectDesc"
          placeholder="Nhập mô tả"
          autoComplete={false}
        />
      </div>
      <button className="createProject__addBtn">Thêm mới</button>
    </Modal>
  );
};
CreateProject.propTypes = {
  handleOpen: PropTypes.func,
};
export default CreateProject;
