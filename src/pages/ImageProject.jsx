import { useState } from "react";
import "../assets/css/imageProject.css";
import CreateProject from "../components/CreateProject";
import PictureProjectItem from "../components/PictureProjectItem";

const ImageProject = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);
  return (
    <div className="imageProject">
      <div className="text-lg font-semibold">Danh sách dự án hình ảnh</div>

      <div className="imageProject__box">
        <button
          className="imageProject__create"
          onClick={() => {
            setOpenCreateProject(true);
          }}
        >
          Thêm mới
        </button>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên dự án</th>
              <th>Mô tả</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <PictureProjectItem />
            <PictureProjectItem />
            <PictureProjectItem />
            <PictureProjectItem />
            <PictureProjectItem />
            <PictureProjectItem />
            <PictureProjectItem />
          </tbody>
        </table>
      </div>
      {openCreateProject && (
        <CreateProject
          handleOpen={() => {
            setOpenCreateProject(false);
          }}
        />
      )}
    </div>
  );
};

export default ImageProject;
