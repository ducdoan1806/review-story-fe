import "../assets/css/imageProject.css";
import VideoProjectItem from "../components/VideoProjectItem";

const VideoProject = () => {
  return (
    <div className="imageProject">
      <div className="text-lg font-semibold">Danh sách dự án Video</div>

      <div className="imageProject__box">
        <div className="imageProject__control">
          <input type="text" placeholder="Tìm kiếm theo tên..." autoFocus />
          <button className="imageProject__create">Thêm mới</button>
        </div>
        <div
          className="overflow-auto mt-3"
          style={{ height: "calc(100vh - 220px)" }}
        >
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
              <VideoProjectItem idx={0} />
              <VideoProjectItem idx={0} />
              <VideoProjectItem idx={0} />
              <VideoProjectItem idx={0} />
              <VideoProjectItem idx={0} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VideoProject;
