import "../assets/css/imageProject.css";
import PictureProjectItem from "../components/PictureProjectItem";

const ImageProject = () => {
  return (
    <div className="imageProject">
      <div className="text-lg font-semibold">Danh sách dự án</div>

      <div className="imageProject__box">
        <button className="imageProject__create">Thêm mới</button>
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
    </div>
  );
};

export default ImageProject;
