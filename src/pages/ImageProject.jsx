import { useEffect, useState } from "react";
import "../assets/css/imageProject.css";
import CreateProject from "../components/CreateProject";
import PictureProjectItem from "../components/PictureProjectItem";
import { useDispatch, useSelector } from "react-redux";
import { getProjectList } from "../features/projectImg/api";

const ImageProject = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const dispatch = useDispatch();
  const { loaded: projectImgLoaded, projectList: projectImgList } = useSelector(
    (state) => state.projectImg
  );
  useEffect(() => {
    dispatch(getProjectList());
  }, [dispatch]);
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
              <th>Ngày tạo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projectImgLoaded &&
              projectImgList.map((item, idx) => (
                <PictureProjectItem key={item?.id} idx={idx} {...item} />
              ))}
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
