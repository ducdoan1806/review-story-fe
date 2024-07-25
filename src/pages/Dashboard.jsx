import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/dashboard.css";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { getProjectList } from "../features/projectImg/api";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { count: imgProjectCount } = useSelector((state) => state.projectImg);

  useEffect(() => {
    dispatch(getProjectList({ page: 1, pageSize: 1, search: "" }));
  }, [dispatch]);
  return (
    <div className="dashboard">
      <div className="text-lg font-semibold">Trang chủ</div>
      <div className="flex gap-3">
        <div className="dashboard__box">
          <span>DỰ ÁN HÌNH ẢNH</span>
          <p>{imgProjectCount || 0}</p>
          <div className="dashboard__icon">
            <FontAwesomeIcon icon={faImage} />
          </div>
        </div>
        <div className="dashboard__box">
          <span>DỰ ÁN VIDEO</span>
          <p>3</p>
          <div className="dashboard__icon">
            <FontAwesomeIcon icon={faVideo} />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="dashboard__box"></div>
        <div className="dashboard__box"></div>
      </div>
    </div>
  );
};

export default Dashboard;
