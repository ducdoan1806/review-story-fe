import { useEffect, useState } from "react";
import "../assets/css/imageProject.css";
import CreateProject from "../components/CreateProject";
import PictureProjectItem from "../components/PictureProjectItem";
import { useDispatch, useSelector } from "react-redux";
import { getProjectList } from "../features/projectImg/api";
import { projectImgAction } from "../features/projectImg/projectImgSlice";
import { useDebounced } from "../utils/utils";

const ImageProject = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const dispatch = useDispatch();
  const debouncedSearch = useDebounced((query) => {
    dispatch(projectImgAction.setSearchQuery({ search: query }));
  }, 500);
  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };
  const {
    loaded: projectImgLoaded,
    loading,
    projectList: projectImgList,
    count,
    page,
    pageSize,
    search,
  } = useSelector((state) => state.projectImg);
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (
      scrollHeight <= scrollTop + clientHeight &&
      count > projectImgList?.length
    ) {
      if (!loading) {
        dispatch(
          projectImgAction.updatePagination({
            page: page + 1,
            pageSize,
          })
        );
        dispatch(getProjectList({ page: page + 1, pageSize, search }));
      }
    }
  };
  useEffect(() => {
    if (page === 1) dispatch(getProjectList({ page, pageSize, search }));
  }, [dispatch, page, pageSize, search]);
  return (
    <div className="imageProject">
      <div className="text-lg font-semibold">Danh sách dự án hình ảnh</div>

      <div className="imageProject__box">
        <div className="imageProject__control">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Tìm kiếm theo tên..."
            autoFocus
          />
          <button
            className="imageProject__create"
            onClick={() => {
              setOpenCreateProject(true);
            }}
          >
            Thêm mới
          </button>
        </div>
        <div
          className="overflow-auto mt-3"
          style={{ height: "calc(100vh - 220px)" }}
          onScroll={handleScroll}
        >
          {projectImgLoaded &&
            (projectImgList?.length ? (
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
                  {projectImgList.map((item, idx) => (
                    <PictureProjectItem key={item?.id} idx={idx} {...item} />
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-base">Bạn không có dự án nào</p>
            ))}
        </div>
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
