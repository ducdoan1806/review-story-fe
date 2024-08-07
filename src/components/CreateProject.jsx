import { useState } from "react";
import "../assets/css/createProject.css";
import Modal from "./Modal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { createProjectApi } from "../features/projectImg/api";
const CreateProject = ({ handleOpen }) => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    lang: "",
    content: "",
  });
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.projectImg);

  const handleChangeProject = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const handleClickProject = () => {
    dispatch(createProjectApi(project));
    handleOpen();
  };

  return (
    <Modal title={"Thêm mới dự án"} handleOpen={handleOpen}>
      <div className="createProject__inputGroup">
        <label htmlFor="title">Tên dự án</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Nhập tên dự án"
          onChange={handleChangeProject}
          value={project.title}
        />
      </div>
      <div className="createProject__inputGroup">
        <label htmlFor="description">Mô tả</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleChangeProject}
          value={project.description}
          placeholder="Nhập mô tả"
        />
      </div>
      {error && (
        <p className="text-center mb-2 text-red-500">
          {error?.errors?.title?.join("")}
        </p>
      )}
      <button onClick={handleClickProject} className="createProject__addBtn">
        Thêm mới
      </button>
    </Modal>
  );
};
CreateProject.propTypes = {
  handleOpen: PropTypes.func,
};
export default CreateProject;
