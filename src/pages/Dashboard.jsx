import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/dashboard.css";
import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="text-lg font-semibold">Trang chủ</div>
      <div className="flex gap-3">
        <div className="dashboard__box">
          <span>DỰ ÁN CHỨC NĂNG 1</span>
          <p>3</p>
          <div className="dashboard__icon">
            <FontAwesomeIcon icon={faImage} />
          </div>
        </div>
        <div className="dashboard__box">
          <span>DỰ ÁN CHỨC NĂNG 1</span>
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
